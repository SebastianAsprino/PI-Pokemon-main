//     __________________   ___    ____  ____
//    / ____/ ____/_  __/  /   |  / __ \/  _/
//   / / __/ __/   / /    / /| | / /_/ // /  
//  / /_/ / /___  / /    / ___ |/ ____// /   
//  \____/_____/ /_/    /_/  |_/_/   /___/  

const fetch = require("node-fetch");

const GETApiPokemon = async () => {
  const Requests = 20; // los pokemos llegan por ID actualmente estoy trayendo solo 4
  const Pokemons = [];  
  for (let id = 1; id <= Requests; id++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json());
    Pokemons.push(response);
  }
  return Pokemons;
};

const GETApiType = async () => {
  const Types = await fetch(
    'https://pokeapi.co/api/v2/type'
  ).then((response) => response.json());
  return Types;
};

module.exports = { 
  GETApiPokemon,
  GETApiType
};