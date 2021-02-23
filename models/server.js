const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  port = process.env.PORT;
  paths = {
    auth: '/api/auth',
    categories: '/api/categories',
    users: '/api/users',
    products: '/api/products',
    search: '/api/search',
  };

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
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.search, require('../routes/search'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening in http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
