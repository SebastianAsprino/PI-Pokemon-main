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

    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal({ msg: 'Pokemon creado' });
  });

  it('retorna 400 con el detalle de los errores si el body es inválido', async () => {
    const invalidPokemon = {};
    const response = await request(app)
      .post('/poke')
      .send(invalidPokemon);

    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal('Datos inválidos');
    expect(response.body.details).to.be.an('array').that.is.not.empty;
  });
});