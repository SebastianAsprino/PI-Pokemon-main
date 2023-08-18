const { expect } = require('chai');
const sinon = require('sinon');
const { postPokemon } = require('../src/controllers');
const { Pokemon,Type } = require('../src/db');

describe('postPokemon', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('crea un nuevo pokemon en la database', async () => {
    const mockPokemonData = {
      id: 1,
      name: 'bulbasaur',
      imagen: '...',
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
      height: 7,
      weight: 69,
      createdByDB: true,
    };

    const mockTypes = [{ name: 'grass' }, { name: 'poison' }];

    const createStub = sinon.stub(Pokemon, 'create').resolves(mockPokemonData);
    const findAllStub = sinon.stub(Type, 'findAll').resolves(mockTypes);
    const addTypeStub = sinon.stub().resolves();

    createStub.returns({ addType: addTypeStub });

    const result = await postPokemon(
      mockPokemonData.id,
      mockPokemonData.name,
      mockPokemonData.imagen,
      mockPokemonData.hp,
      mockPokemonData.attack,
      mockPokemonData.defense,
      mockPokemonData.speed,
      mockPokemonData.height,
      mockPokemonData.weight,
      ['grass', 'poison']
    );

    expect(result).to.be.undefined;
    expect(createStub.calledOnce).to.be.true;
    expect(findAllStub.calledOnce).to.be.true;
    expect(addTypeStub.calledOnce).to.be.true;
    expect(addTypeStub.firstCall.args[0]).to.deep.equal(mockTypes);
  });
});