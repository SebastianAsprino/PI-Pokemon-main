const { expect } = require('chai');
const { conn, Pokemon } = require('../src/db');

describe('Configuracion de la DB', () => {
  it('debe establecer una conexión de base de datos', async () => {
    try {
      await conn.authenticate();
      expect(conn).to.be.ok;
    } catch (error) {
        throw new Error('La conexión a la base de datos fallo');
    }
  });
});

describe('Modelos', () => {
  it('debe importar e inicializar modelos', async () => {
    expect(Pokemon).to.be.ok;
    expect(Pokemon.name).to.equal('pokemon');
  });
});