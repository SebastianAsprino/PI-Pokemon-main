//     __________________   ________  ______  ___________
//    / ____/ ____/_  __/  /_  __/\ \/ / __ \/ ____/ ___/
//   / / __/ __/   / /      / /    \  / /_/ / __/  \__ \
//  / /_/ / /___  / /      / /     / / ____/ /___ ___/ /
//  \____/_____/ /_/      /_/     /_/_/   /_____//____/

const { Type } = require('../db');
const { GETApiType } = require('./api');

/** Devuelve los tipos de la DB; si está vacía, los trae de la PokeAPI y los guarda. */
const GETType = async () => {
  const types = await Type.findAll({ attributes: ['name'] });
  if (types.length > 0) return types;

  const { results } = await GETApiType();
  const apiTypes = results.map((result, index) => ({
    id: index + 1,
    name: result.name,
  }));
  await Type.bulkCreate(apiTypes);
  return apiTypes;
};

module.exports = {
  GETType,
};
