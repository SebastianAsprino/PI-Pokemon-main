const { expect } = require('chai');
const { GETType } = require('../src/controllers/type');

describe('GETTypes', () => {
  it('debe traer del api los types y crearlos en la DB', async () => {
    const result = await GETType();
    expect(result).to.be.an('array');
  });
});