const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('Ruta GET/pokemons', () => {
  it('retorna la lista de pokemons', async () => {
    const response = await request(app).get('/pokemons');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});

describe('Ruta GET/pokemons/id/:id', () => {
  it('retorna un pokemn especifico por ID', async () => {
    const response = await request(app).get('/pokemons/id/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('retorna "Pokemon no encontrado" si la ID no existe en la DB', async () => {
    const response = await request(app).get('/pokemons/id/0');
    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Pokemon no encontrado');
  });
});

describe('Ruta GET/pokemons/name/:name', () => {
  it('retorna pokemons con el mismo nombre (el test usa a ya que trae todo aquel con a)', async () => {
    const response = await request(app).get('/pokemons/name/a');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('retorna "Pokemon no encontrado" si el name no existe en la DB', async () => {
    const response = await request(app).get('/pokemons/name/nonexisting');
    expect(response.status).to.equal(404);
    expect(response.text).to.equal('Pokemon no encontrado');
  });
});

describe('Ruta GET/pokemons/filter/:id', () => {
  it('retorna los pokemons filtrados de A a Z', async () => {
    const response = await request(app).get('/pokemons/filter/1');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('retorna los pokemons filtrados de Z a A', async () => {
    const response = await request(app).get('/pokemons/filter/2');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });

  it('retorna el caso default "Filtro no válido" si el filtro no existe', async () => {
    const response = await request(app).get('/pokemons/filter/0'); 
    expect(response.status).to.equal(400);
    expect(response.text).to.equal('Filtro no válido');
  });
});