const { GETApiPokemon } = require('../src/controllers/api');
const { expect } = require('chai');

describe('GETApiPokemon', () => {
  it('debe obtener datos para múltiples solicitudes', async () => {
    const data = await GETApiPokemon();
    expect(data).to.be.an('array');
    expect(data).to.not.have.lengthOf(0);
  });
});