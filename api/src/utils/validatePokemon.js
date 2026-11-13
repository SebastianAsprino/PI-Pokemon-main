const MAX_NAME_LENGTH = 255;
const STAT_FIELDS = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];

const toNonNegativeInteger = (value) => {
  if (value === '' || value === null || value === undefined || typeof value === 'boolean') {
    return null;
  }
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : null;
};

/**
 * Valida y normaliza el body de POST /poke.
 * Devuelve { errors } si hay datos inválidos o { pokemon } con los valores ya convertidos.
 */
const validatePokemon = (body = {}) => {
  const errors = [];

  const id = toNonNegativeInteger(body.id);
  if (id === null || id === 0) errors.push('id debe ser un entero positivo');

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  if (!name || name.length > MAX_NAME_LENGTH) {
    errors.push(`name es obligatorio (máximo ${MAX_NAME_LENGTH} caracteres)`);
  }

  const imagen = typeof body.imagen === 'string' ? body.imagen.trim() : '';
  if (!imagen) errors.push('imagen es obligatoria');

  const stats = {};
  STAT_FIELDS.forEach((field) => {
    stats[field] = toNonNegativeInteger(body[field]);
    if (stats[field] === null) errors.push(`${field} debe ser un entero mayor o igual a 0`);
  });

  const types = body.types === undefined ? [] : body.types;
  if (!Array.isArray(types) || !types.every((type) => typeof type === 'string')) {
    errors.push('types debe ser una lista de nombres de tipos');
  }

  if (errors.length > 0) return { errors };

  return {
    pokemon: {
      id, name, imagen, ...stats, types,
    },
  };
};

module.exports = { validatePokemon };
