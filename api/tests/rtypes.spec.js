const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe(' Ruta GET/types', () => {
  it('retorna la lista de types', async () => {
    const response = await request(app).get('/types');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});

describe('Ruta GET/types/pokemon', () => {
  it('retorna la lista type con la info de sus pokemons', async () => {
    const response = await request(app).get('/types/pokemon');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});