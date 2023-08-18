//      ____              __       ____        __                            
//     / __ \____  __  __/ /____  / __ \____  / /_____  ____ ___  ____  ____ 
//    / /_/ / __ \/ / / / __/ _ \/ /_/ / __ \/ //_/ _ \/ __ `__ \/ __ \/ __ \
//   / _, _/ /_/ / /_/ / /_/  __/ ____/ /_/ / ,< /  __/ / / / / / /_/ / / / /
//  /_/ |_|\____/\__,_/\__/\___/_/    \____/_/|_|\___/_/ /_/ /_/\____/_/ /_/ 

const { Router } = require('express');
const { GETPokemon, postPokemon } = require('../controllers');

const Rpokemon = Router();

Rpokemon.get("/pokemons", async (req, res) => {
  try {
    const data = await GETPokemon();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

Rpokemon.get('/pokemons/id/:id', async (req, res) => {
  const { id } = req.params;
  let allInfo = await GETPokemon();
  if (!isNaN(id)) {
    let numID = Number(id);
    let FilteredPokemon = allInfo.find((element) => element.id === numID);
    FilteredPokemon
      ? res.status(200).send(FilteredPokemon)
      : res.status(404).send('Pokemon no encontrado');
  } else {
    res.status(400).send('El ID debe ser un número válido');
  }
});

Rpokemon.get('/pokemons/name/:name', async (req, res) => {
  const { name } = req.params;
  let allInfo = await GETPokemon();
  
  if (typeof name === 'string') {
    let FilteredPokemon = allInfo.filter(
      (element) => element.name.toLowerCase().includes(name.toLowerCase())
    );
    if (FilteredPokemon.length > 0) {
      res.status(200).send(FilteredPokemon);
    } else {
      res.status(404).send('Pokemon no encontrado');
    }
  }
});

Rpokemon.get('/pokemons/filter/:id', async (req, res) => {
  const { id } = req.params;
  let allInfo = await GETPokemon();
  switch (id) {
    case '1'://filtro de A a Z
      const sortedPokemonAZ = allInfo.slice().sort((a, b) => a.name.localeCompare(b.name));
      res.status(200).send(sortedPokemonAZ);
      break;
    case '2'://filtro de Z a A
      const sortedPokemonZA = allInfo.slice().sort((a, b) => b.name.localeCompare(a.name));
      res.status(200).send(sortedPokemonZA);
      break;
    default:
      res.status(400).send('Filtro no válido');
      break;
  }
});

Rpokemon.post("/poke", async (req, res) => {
  try {
    const { id, name, imagen, hp, attack, defense, speed, height, weight, types } = req.body;

    await postPokemon(id, name, imagen, hp, attack, defense, speed, height, weight, types);

    return res.status(200).json({ msg: "Pokemon creado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al crear el pokemon" });
  }
});

module.exports = Rpokemon;