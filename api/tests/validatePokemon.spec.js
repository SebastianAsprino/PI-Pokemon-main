const { expect } = require('chai');
const { validatePokemon } = require('../src/utils/validatePokemon');

const validBody = {
  id: '501',
  name: '  Pikachu ',
  imagen: 'https://example.com/pikachu.png',
  hp: 35,
  attack: '55',
  defense: 40,
  speed: 90,
  height: 4,
  weight: 60,
  types: ['electric'],
};

describe('validatePokemon', () => {
  it('normaliza un body válido (números y nombre recortado)', () => {
    const { errors, pokemon } = validatePokemon(validBody);

    expect(errors).to.be.undefined;
    expect(pokemon).to.deep.equal({
      ...validBody, id: 501, name: 'Pikachu', attack: 55,
    });
  });

  it('usa una lista vacía de tipos si no se envían', () => {
    const { types, ...withoutTypes } = validBody;
    const { pokemon } = validatePokemon(withoutTypes);

    expect(pokemon.types).to.deep.equal([]);
  });

  it('rechaza un body vacío listando todos los campos faltantes', () => {
    const { errors, pokemon } = validatePokemon({});

    expect(pokemon).to.be.undefined;
    expect(errors).to.have.lengthOf(9);
  });

  it('rechaza estadísticas negativas, decimales o no numéricas', () => {
    ['-1', 1.5, 'abc', true].forEach((hp) => {
      const { errors } = validatePokemon({ ...validBody, hp });
      expect(errors, `hp=${hp}`).to.deep.equal(['hp debe ser un entero mayor o igual a 0']);
    });
  });

  it('rechaza types que no sean una lista de strings', () => {
    expect(validatePokemon({ ...validBody, types: 'fire' }).errors).to.have.lengthOf(1);
    expect(validatePokemon({ ...validBody, types: [{ name: 'fire' }] }).errors).to.have.lengthOf(1);
  });
});
