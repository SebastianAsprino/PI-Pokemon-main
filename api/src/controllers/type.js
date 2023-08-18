//     __________________   ________  ______  ___________
//    / ____/ ____/_  __/  /_  __/\ \/ / __ \/ ____/ ___/
//   / / __/ __/   / /      / /    \  / /_/ / __/  \__ \ 
//  / /_/ / /___  / /      / /     / / ____/ /___ ___/ / 
//  \____/_____/ /_/      /_/     /_/_/   /_____//____/  

const { Type } = require("../db")
const { GETApiType } = require("./api");

const GETType = async () => {
  let type = await Type.findAll({ attributes: ["name"] }); 
  if (!type.length) {
    type = await GETApiType();
    type = type.results.map((result, index) => ({
      id: index + 1,
      name: result.name,
    }));
    await Type.bulkCreate(type);
  }
  return type;
};

module.exports = {
  GETType,
};