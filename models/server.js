const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  port = process.env.PORT;
  usersPath = '/api/users';
  authPath = '/api/auth';

  constructor() {
    this.app = express();

    this.connectDatabase();

    this.middlewares();
    this.routes();
  }

  async connectDatabase() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening in http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
