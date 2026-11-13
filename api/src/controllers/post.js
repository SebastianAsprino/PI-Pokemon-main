//      ____  ____  ___________
//     / __ \/ __ \/ ___/_  __/
//    / /_/ / / / /\__ \ / /
//   / ____/ /_/ /___/ // /
//  /_/    \____//____//_/

const { Pokemon, Type } = require('../db');

/**
 * Crea un pokemon en la DB (marcado como createdByDB) y lo asocia con los tipos indicados.
 */
const postPokemon = async ({
  id, name, imagen, hp, attack, defense, speed, height, weight, types = [],
}) => {
  const createdPokemon = await Pokemon.create({
    id,
    name,
    imagen,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdByDB: true,
  });
  const pokemonTypes = await Type.findAll({
    where: { name: types },
  });
  return createdPokemon.addType(pokemonTypes);
};

module.exports = {
  postPokemon,
};
