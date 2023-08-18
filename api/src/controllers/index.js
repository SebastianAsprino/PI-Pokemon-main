//    __________  _   ____________  ____  __    __    __________  _____
//   / ____/ __ \/ | / /_  __/ __ \/ __ \/ /   / /   / ____/ __ \/ ___/
//  / /   / / / /  |/ / / / / /_/ / / / / /   / /   / __/ / /_/ /\__ \ 
// / /___/ /_/ / /|  / / / / _, _/ /_/ / /___/ /___/ /___/ _, _/___/ / 
// \____/\____/_/ |_/ /_/ /_/ |_|\____/_____/_____/_____/_/ |_|/____/

const { GETApiPokemon, GETApiType } = require("./api")
const { getDBInfoPokemon, getDBInfoType } = require("./DBinfo")
const { GETPokemon } = require("./pokemon")
const { postPokemon } = require("./post")
const { GETType } = require("./type")

module.exports = {
  GETApiPokemon,
  GETApiType,
  getDBInfoPokemon,
  getDBInfoType,
  GETPokemon,
  postPokemon,
  GETType 
};
