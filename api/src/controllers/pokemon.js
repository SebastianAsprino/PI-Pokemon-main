//     __________________   ____  ____  __ __ ________  _______  _   _______
//    / ____/ ____/_  __/  / __ \/ __ \/ //_// ____/  |/  / __ \/ | / / ___/
//   / / __/ __/   / /    / /_/ / / / / ,<  / __/ / /|_/ / / / /  |/ /\__ \ 
//  / /_/ / /___  / /    / ____/ /_/ / /| |/ /___/ /  / / /_/ / /|  /___/ / 
//  \____/_____/ /_/    /_/    \____/_/ |_/_____/_/  /_/\____/_/ |_//____/  

const { Pokemon, Type } = require("../db");
const { GETApiPokemon } = require("./api");
const { getDBInfoPokemon } = require("./DBinfo");
const { GETType } = require("./type");

const GETPokemon = async () => {
  let AllPokemons = await getDBInfoPokemon();
  if (!AllPokemons.length) {
    const apiResponse = await GETApiPokemon();
    const apiPokemon = apiResponse.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        imagen: pokemon.sprites.other['official-artwork'].front_default,
        hp: pokemon.stats.find(stat => stat.stat.name === "hp")?.base_stat ?? 0,
        attack: pokemon.stats.find(stat => stat.stat.name === "attack")?.base_stat ?? 0,
        defense: pokemon.stats.find(stat => stat.stat.name === "defense")?.base_stat ?? 0,
        speed: pokemon.stats.find(stat => stat.stat.name === "speed")?.base_stat ?? 0,
        height: pokemon.height,
        weight: pokemon.weight,
        createdByDB: false
      };
    });
    await Pokemon.bulkCreate(apiPokemon);
    const createdPokemons = await Pokemon.findAll();
    const AllTypes = await GETType();
    for (const createdPokemon of createdPokemons) {
      const typesFromAPI = apiResponse.find(pokemon => pokemon.id === createdPokemon.id).types;
      const associatedTypes = typesFromAPI.map(type => AllTypes.find(dbType => dbType.name === type.type.name));
      const typeNames = associatedTypes.map(type => type.name);
      let Arraytype = await Type.findAll({
        where: {name: typeNames},
      });
      await createdPokemon.addType(Arraytype);
    }
    AllPokemons = await getDBInfoPokemon();
  }
  return AllPokemons;
};

module.exports = {
  GETPokemon
};