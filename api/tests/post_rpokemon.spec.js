const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

function generateRandomId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('Ruta POST/poke', () => {
  it('crea un nuevo pokemon', async () => {
    const newPokemon = {
      id: generateRandomId(10000, 99999),
      name: 'Pokemon',
      imagen: 'pokemon.png',
      hp: 100,
      attack: 50,
      defense: 40,
      speed: 70,
      height: 1,
      weight: 50,
      types: ['Normal']
    };

    const response = await request(app)
      .post('/poke')
      .send(newPokemon);

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ msg: 'Pokemon creado' });
  });

  it('retorna "Error al crear el pokemon" si no se pudo crear el pokemon', async () => {
    const invalidPokemon = {};
    const response = await request(app)
      .post('/poke')
      .send(invalidPokemon);

    expect(response.status).to.equal(500);
    expect(response.body).to.deep.equal({ error: 'Error al crear el pokemon' });
  });
});