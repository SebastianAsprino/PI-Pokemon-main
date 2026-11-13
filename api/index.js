//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

require('dotenv').config();

const { DATABASE } = process.env;
const PORT = Number(process.env.PORT) || 8080;

if (!DATABASE) {
  console.error('Falta la variable de entorno DATABASE (ver .env.example)'); // eslint-disable-line no-console
  process.exit(1);
}

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Sincroniza los modelos con la DB. Para recrear las tablas: conn.sync({ force: true }).
conn.sync()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`API escuchando en el puerto ${PORT}`); // eslint-disable-line no-console
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error.message); // eslint-disable-line no-console
    process.exit(1);
  });
