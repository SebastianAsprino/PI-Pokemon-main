const { expect } = require('chai');
const { GETPokemon } = require('../src/controllers/pokemon');

describe('GETPokemon', () => {
  it('debe traer del api los pokemons y crearlos en la DB', async () => {
    const result = await GETPokemon();
    expect(result).to.be.an('array');
  });
});