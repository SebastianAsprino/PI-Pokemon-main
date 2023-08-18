// //      ____  ____  ___________   
// //     / __ \/ __ \/ ___/_  __/   
// //    / /_/ / / / /\__ \ / /      
// //   / ____/ /_/ /___/ // /       
// //  /_/    \____//____//_/ 

const { Pokemon, Type } = require("../db");

const postPokemon = async (id, name, imagen, hp, attack, defense, speed, height, weight, types) => {  
    let CreatePokemon = await Pokemon.create({
      id: id,
      name: name,
      imagen: imagen,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
      height: height,
      weight: weight,
      createdByDB: true  
  });
  let Types = await Type.findAll({   
    where: { name: types },
  }); 
  return await CreatePokemon.addType(Types);
};

module.exports = { 
  postPokemon
};