//     __________________   ____  ____  __ __ ________  _______  _   _______
//    / ____/ ____/_  __/  / __ \/ __ \/ //_// ____/  |/  / __ \/ | / / ___/
//   / / __/ __/   / /    / /_/ / / / / ,<  / __/ / /|_/ / / / /  |/ /\__ \
//  / /_/ / /___  / /    / ____/ /_/ / /| |/ /___/ /  / / /_/ / /|  /___/ /
//  \____/_____/ /_/    /_/    \____/_/ |_/_____/_/  /_/\____/_/ |_//____/

const { Pokemon, Type } = require('../db');
const { GETApiPokemon } = require('./api');
const { getDBInfoPokemon } = require('./DBinfo');
const { GETType } = require('./type');

const getBaseStat = (pokemon, statName) => pokemon.stats
  .find((stat) => stat.stat.name === statName)?.base_stat ?? 0;

/** Convierte la respuesta de la PokeAPI al formato del modelo Pokemon. */
const mapApiPokemon = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,
  imagen: pokemon.sprites.other['official-artwork'].front_default,
  hp: getBaseStat(pokemon, 'hp'),
  attack: getBaseStat(pokemon, 'attack'),
  defense: getBaseStat(pokemon, 'defense'),
  speed: getBaseStat(pokemon, 'speed'),
  height: pokemon.height,
  weight: pokemon.weight,
  createdByDB: false,
});

/**
 * Primera carga: trae los pokemons de la PokeAPI, los guarda en la DB
 * y los asocia con sus tipos.
 */
const seedPokemonsFromApi = async () => {
  const apiResponse = await GETApiPokemon();
  const createdPokemons = await Pokemon.bulkCreate(apiResponse.map(mapApiPokemon));

  await GETType(); // asegura que la tabla de tipos esté cargada
  const typesByName = new Map((await Type.findAll()).map((type) => [type.name, type]));
  const apiTypesById = new Map(apiResponse.map((pokemon) => [pokemon.id, pokemon.types]));

  await Promise.all(createdPokemons.map((createdPokemon) => {
    const types = (apiTypesById.get(createdPokemon.id) || [])
      .map(({ type }) => typesByName.get(type.name))
      .filter(Boolean);
    return createdPokemon.addTypes(types);
  }));
};

const GETPokemon = async () => {
  const pokemons = await getDBInfoPokemon();
  if (pokemons.length > 0) return pokemons;

  await seedPokemonsFromApi();
  return getDBInfoPokemon();
};

module.exports = {
  GETPokemon,
};
