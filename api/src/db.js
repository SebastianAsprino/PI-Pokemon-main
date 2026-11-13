require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const { DATABASE, DB_SSL, DB_SSL_REJECT_UNAUTHORIZED } = process.env;

// Sin credenciales: solo permite importar los modelos (p. ej. en tests unitarios).
// index.js exige DATABASE antes de levantar el servidor.
const LOCAL_DATABASE = 'postgres://localhost:5432/pokemon';

// SSL activo por defecto (bases gestionadas en la nube); DB_SSL=false para Postgres local.
const useSSL = DB_SSL !== 'false';
const dialectOptions = useSSL
  ? { ssl: { require: true, rejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED === 'true' } }
  : {};

const sequelize = new Sequelize(DATABASE || LOCAL_DATABASE, {
  dialect: 'postgres',
  logging: false,
  dialectOptions,
});

const modelsDir = path.join(__dirname, 'models');

// Cada archivo de /models exporta una función que define el modelo sobre la conexión.
fs.readdirSync(modelsDir)
  .filter((file) => !file.startsWith('.') && file.endsWith('.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const defineModel = require(path.join(modelsDir, file));
    defineModel(sequelize);
  });

// Capitalizamos los nombres de los modelos, ie: pokemon => Pokemon
sequelize.models = Object.fromEntries(
  Object.entries(sequelize.models).map(([name, model]) => [
    name[0].toUpperCase() + name.slice(1),
    model,
  ]),
);

const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: 'pokemon_type' });
Type.belongsToMany(Pokemon, { through: 'pokemon_type' });

module.exports = {
  ...sequelize.models, // const { Pokemon, Type } = require('./db.js');
  conn: sequelize, // const { conn } = require('./db.js');
};
