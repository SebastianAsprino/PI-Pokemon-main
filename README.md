# PI Pokemon

Single Page Application full-stack para explorar, buscar, filtrar y crear Pokemons. La API
consume la [PokeAPI](https://pokeapi.co/) la primera vez, guarda los datos en PostgreSQL y desde
ahí sirve todo al cliente. Proyecto individual del bootcamp de SoyHenry.

> El enunciado original del bootcamp está en [`docs/ENUNCIADO.md`](docs/ENUNCIADO.md).

## Funcionalidades

- **Listado paginado** de los primeros 500 Pokemons (18 por página) con imagen, tipos, HP, ataque y velocidad.
- **Búsqueda** por nombre (coincidencia parcial, sin distinguir mayúsculas).
- **Filtros y ordenamientos**: A-Z, Z-A, por ataque (asc/desc) y por origen (PokeAPI o creados por el usuario).
- **Detalle** de cada Pokemon con todas sus estadísticas.
- **Formulario de creación** con validación en el cliente y en el servidor, y asociación a uno o más tipos.

## Stack

| Capa     | Tecnologías                                                        |
| -------- | ------------------------------------------------------------------ |
| Cliente  | React 18, Redux + redux-thunk, React Router 6, Vite, CSS plano     |
| API      | Node.js, Express 4, Sequelize 6, node-fetch                        |
| Datos    | PostgreSQL (relación muchos a muchos `pokemon` ↔ `type`)           |
| Testing  | Mocha, Chai, Sinon, Supertest, nyc                                 |

## Arquitectura

```
React (Vite)  ──fetch──▶  Express API  ──Sequelize──▶  PostgreSQL
                               │
                               └── primera carga ──▶  PokeAPI
```

1. Al primer `GET /pokemons` la API detecta la DB vacía, trae los 500 Pokemons de la PokeAPI en
   tandas de requests paralelas, los guarda y los asocia con sus tipos.
2. Las siguientes consultas se resuelven contra PostgreSQL.
3. El cliente guarda el estado en Redux; cada acción es un thunk que llama a la API mediante un
   helper común que maneja los errores HTTP.

### Estructura

```
.
├── api/
│   ├── index.js               # Entrada: valida el entorno, sincroniza la DB y levanta el servidor
│   ├── src/
│   │   ├── app.js             # Express: CORS, parsers, logging, rutas y manejo de errores
│   │   ├── db.js              # Conexión Sequelize, carga de modelos y relaciones
│   │   ├── models/            # Pokemon y Type
│   │   ├── controllers/       # PokeAPI, consultas a la DB, carga inicial y creación
│   │   ├── routes/            # /pokemons, /poke y /types
│   │   └── utils/             # asyncHandler y validación del body de creación
│   └── tests/                 # Tests unitarios y de integración (Mocha)
├── client/
│   └── src/
│       ├── components/        # Landing, Home, Cards, Card, Detail, Form, NavBar, SearchBar, Filter...
│       ├── hooks/             # useImageLoaded (precarga de imágenes)
│       └── redux/             # actions, actionTypes, reducer y store
└── docs/                      # Enunciado y guía original del bootcamp
```

## Endpoints de la API

| Método | Ruta                      | Descripción                                                              |
| ------ | ------------------------- | ------------------------------------------------------------------------ |
| GET    | `/pokemons`               | Todos los Pokemons con sus tipos                                         |
| GET    | `/pokemons/id/:id`        | Detalle por ID (`400` si no es numérico, `404` si no existe)             |
| GET    | `/pokemons/name/:name`    | Búsqueda parcial por nombre (`404` si no hay resultados)                 |
| GET    | `/pokemons/filter/:id`    | `1` A-Z · `2` Z-A · `3` creados · `4` de la API · `5` ataque ↓ · `6` ataque ↑ |
| POST   | `/poke`                   | Crea un Pokemon (`201`; `400` con el detalle si el body es inválido; `409` si el ID ya existe) |
| GET    | `/types`                  | Lista de tipos                                                           |
| GET    | `/types/pokemon`          | Tipos con los Pokemons asociados                                         |

Body de ejemplo para `POST /poke`:

```json
{
  "id": 501,
  "name": "pikachu-custom",
  "imagen": "https://example.com/pikachu.png",
  "hp": 35, "attack": 55, "defense": 40, "speed": 90, "height": 4, "weight": 60,
  "types": ["electric"]
}
```

## Puesta en marcha

Requisitos: Node.js 18 o superior y una base PostgreSQL.

### API

```bash
cd api
cp .env.example .env    # completá DATABASE con tu cadena de conexión
npm install
npm start               # o `npm run dev` con recarga automática (nodemon)
```

Variables de entorno (`api/.env`):

| Variable                     | Descripción                                                     | Por defecto |
| ---------------------------- | --------------------------------------------------------------- | ----------- |
| `DATABASE`                   | Cadena de conexión de PostgreSQL (obligatoria)                  | —           |
| `DB_SSL`                     | `false` para Postgres local sin SSL                             | `true`      |
| `DB_SSL_REJECT_UNAUTHORIZED` | `true` para verificar el certificado del servidor               | `false`     |
| `PORT`                       | Puerto HTTP                                                     | `8080`      |
| `CORS_ORIGIN`                | Orígenes permitidos, separados por coma                         | cualquiera  |

### Cliente

```bash
cd client
cp .env.example .env    # VITE_API_URL apunta a la API (por defecto http://localhost:8080)
npm install
npm run dev             # http://localhost:5173
```

Otros scripts: `npm run build`, `npm run preview` y `npm run lint`.

## Tests

```bash
cd api
npm run test:unit   # tests unitarios: no requieren base de datos ni red
npm test            # suite completa: requiere DATABASE apuntando a una DB de prueba y acceso a la PokeAPI
npm run coverage    # suite completa con reporte de cobertura (nyc)
```

> La suite completa escribe en la base configurada: usá una base de datos de prueba.

## Autor

Sebastian Asprino — [GitHub](https://github.com/SebastianAsprino/)
