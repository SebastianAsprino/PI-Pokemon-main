//      ____              __       ____        __
//     / __ \____  __  __/ /____  / __ \____  / /_____  ____ ___  ____  ____
//    / /_/ / __ \/ / / / __/ _ \/ /_/ / __ \/ //_/ _ \/ __ `__ \/ __ \/ __ \
//   / _, _/ /_/ / /_/ / /_/  __/ ____/ /_/ / ,< /  __/ / / / / / /_/ / / / /
//  /_/ |_|\____/\__,_/\__/\___/_/    \____/_/|_|\___/_/ /_/ /_/\____/_/ /_/

const { Router } = require('express');
const { GETPokemon, postPokemon } = require('../controllers');
const asyncHandler = require('../utils/asyncHandler');
const { validatePokemon } = require('../utils/validatePokemon');

const NOT_FOUND_MESSAGE = 'Pokemon no encontrado';
const NUMERIC_ID = /^\d+$/;

const byName = (a, b) => a.name.localeCompare(b.name);
const byAttack = (a, b) => a.attack - b.attack;

// Cada filtro recibe una copia de la lista y devuelve el resultado ordenado/filtrado.
const FILTERS = new Map([
  ['1', (pokemons) => pokemons.sort(byName)], // A a Z
  ['2', (pokemons) => pokemons.sort((a, b) => byName(b, a))], // Z a A
  ['3', (pokemons) => pokemons.filter((pokemon) => pokemon.createdByDB === true)], // creados en la DB
  ['4', (pokemons) => pokemons.filter((pokemon) => pokemon.createdByDB === false)], // traídos de la API
  ['5', (pokemons) => pokemons.sort((a, b) => byAttack(b, a))], // attack de mayor a menor
  ['6', (pokemons) => pokemons.sort(byAttack)], // attack de menor a mayor
]);

const Rpokemon = Router();

Rpokemon.get('/pokemons', asyncHandler(async (req, res) => {
  res.json(await GETPokemon());
}));

Rpokemon.get('/pokemons/id/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!NUMERIC_ID.test(id)) {
    res.status(400).send('El ID debe ser un número válido');
    return;
  }

  const numID = Number(id);
  const pokemon = (await GETPokemon()).find((element) => element.id === numID);
  if (pokemon) {
    res.status(200).send(pokemon);
  } else {
    res.status(404).send(NOT_FOUND_MESSAGE);
  }
}));

Rpokemon.get('/pokemons/name/:name', asyncHandler(async (req, res) => {
  const name = req.params.name.toLowerCase();
  const matches = (await GETPokemon())
    .filter((element) => element.name.toLowerCase().includes(name));

  if (matches.length > 0) {
    res.status(200).send(matches);
  } else {
    res.status(404).send(NOT_FOUND_MESSAGE);
  }
}));

Rpokemon.get('/pokemons/filter/:id', asyncHandler(async (req, res) => {
  const applyFilter = FILTERS.get(req.params.id);
  if (!applyFilter) {
    res.status(400).send('Filtro no válido');
    return;
  }

  const pokemons = await GETPokemon();
  res.status(200).send(applyFilter(pokemons.slice()));
}));

Rpokemon.post('/poke', asyncHandler(async (req, res) => {
  const { errors, pokemon } = validatePokemon(req.body);
  if (errors) {
    res.status(400).json({ error: 'Datos inválidos', details: errors });
    return;
  }

  await postPokemon(pokemon);
  res.status(201).json({ msg: 'Pokemon creado' });
}));

module.exports = Rpokemon;
