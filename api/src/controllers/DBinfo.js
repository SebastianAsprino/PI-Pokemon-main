//  ________  ________  ___  ________   ________ ________     
// |\   ___ \|\   __  \|\  \|\   ___  \|\  _____\\   __  \    
// \ \  \_|\ \ \  \|\ /\ \  \ \  \\ \  \ \  \__/\ \  \|\  \   
//  \ \  \ \\ \ \   __  \ \  \ \  \\ \  \ \   __\\ \  \\\  \  
//   \ \  \_\\ \ \  \|\  \ \  \ \  \\ \  \ \  \_| \ \  \\\  \ 
//    \ \_______\ \_______\ \__\ \__\\ \__\ \__\   \ \_______\
//     \|_______|\|_______|\|__|\|__| \|__|\|__|    \|_______|

const {  Pokemon, Type  } = require("../db");

const getDBInfoPokemon = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getDBInfoType = async () => {
  return await Type.findAll({
    include: {
      model: Pokemon,
      attributes: ["id","name", "createdByDB", "imagen"],
      through: {
        attributes: [],
      },
    },
  });
};

module.exports = {
  getDBInfoPokemon,
  getDBInfoType
};