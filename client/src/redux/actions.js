import {
  GET_ALL_POKEMONS,
  GET_POKEMON_BY_NAME,
  GET_POKEMON_DETAIL,
  GET_POKEMON_FILTER,
  GET_TYPES,
  POST_POKEMON,
} from './actionTypes';

// URL de la API configurable por entorno (ver client/.env.example).
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

/**
 * Hace la request a la API y devuelve el JSON.
 * Si la respuesta no es 2xx lanza un Error con el mensaje del servidor.
 */
async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Error ${response.status}`);
  }
  return response.json();
}

/** Crea un thunk que pide `path` y despacha `type` con la respuesta. */
const fetchAndDispatch = (type, path, options) => async (dispatch) => {
  const data = await request(path, options);
  return dispatch({ type, payload: data });
};

export const getPokemons = () => fetchAndDispatch(GET_ALL_POKEMONS, '/pokemons');

export const getPokemonByName = (name) =>
  fetchAndDispatch(GET_POKEMON_BY_NAME, `/pokemons/name/${encodeURIComponent(name)}`);

export const getDetail = (id) =>
  fetchAndDispatch(GET_POKEMON_DETAIL, `/pokemons/id/${encodeURIComponent(id)}`);

export const getfilter = (id) =>
  fetchAndDispatch(GET_POKEMON_FILTER, `/pokemons/filter/${encodeURIComponent(id)}`);

export const getTypes = () => fetchAndDispatch(GET_TYPES, '/types');

export const postpokemon = (payload) =>
  fetchAndDispatch(POST_POKEMON, '/poke', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
