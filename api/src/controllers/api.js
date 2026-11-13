//     __________________   ___    ____  ____
//    / ____/ ____/_  __/  /   |  / __ \/  _/
//   / / __/ __/   / /    / /| | / /_/ // /
//  / /_/ / /___  / /    / ___ |/ ____// /
//  \____/_____/ /_/    /_/  |_/_/   /___/

const fetch = require('node-fetch');

const POKEAPI_URL = 'https://pokeapi.co/api/v2';
const POKEMON_COUNT = 500; // Se traen los primeros 500 pokemons por ID
const CONCURRENT_REQUESTS = 50; // Requests en paralelo por tanda, para no saturar la PokeAPI

const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`PokeAPI respondió ${response.status} para ${url}`);
  }
  return response.json();
};

const GETApiPokemon = async () => {
  const ids = Array.from({ length: POKEMON_COUNT }, (_, index) => index + 1);
  const pokemons = [];

  for (let start = 0; start < ids.length; start += CONCURRENT_REQUESTS) {
    const batch = ids.slice(start, start + CONCURRENT_REQUESTS);
    // eslint-disable-next-line no-await-in-loop
    const results = await Promise.all(batch.map((id) => fetchJSON(`${POKEAPI_URL}/pokemon/${id}`)));
    pokemons.push(...results);
  }

  return pokemons;
};

const GETApiType = () => fetchJSON(`${POKEAPI_URL}/type`);

module.exports = {
  GETApiPokemon,
  GETApiType,
};
