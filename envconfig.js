require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  DB_HOST, PORT,
} = process.env;

const DEV_JWT_SECRET = 'U5LX2fdsYGeDbu2VdsO5AIU7a2ffs0M9gN';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/moviesExplorerDB';
const DEV_PORT = 3000;

const DB_URL = NODE_ENV === 'production' && DB_HOST ? DB_HOST : DEV_DB_HOST;
const SERVER_PORT = NODE_ENV === 'production' && PORT ? PORT : DEV_PORT;
const SECRET_STRING = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : DEV_JWT_SECRET;

module.exports = {
  DB_URL,
  SERVER_PORT,
  SECRET_STRING,
};
