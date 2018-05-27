import pool from '../database';

export const createDatabase = (req, res) => {
  (async () => {
    const client = await pool.connect();
    const data = [];
    try {
      await client.query('SELECT * FROM users', (err, response) => {
        if (response) {
          const { rows } = response;
          rows.forEach((row) => {
            data.push(row);
          });
          res.send(data);
        } else {
          res.send(err.message);
        }
      });
    } finally {
      client.release();
    }
  })();
};

export const createTable = (req, res) => {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, firstname VARCHAR(40) NOT NULL, lastName VARCHAR(40) NOT NULL);', (err, response) => {
        res.send(response);
      });
    } catch (e) {
      res.send({
        status: 500,
        message: e.message,
      }).status(500);
    } finally {
      client.release();
    }
  })();
};

export const dropTable = (req, res) => {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query('DROP TABLE users;', (err, response) => {
        res.send(response);
      });
    } catch (e) {
      res.send({
        status: 500,
        message: e.message,
      }).status(500);
    } finally {
      client.release();
    }
  })();
};

export const createUser = (req, res) => {
  (async () => {
    const client = await pool.connect();
    try {
      await client.query("INSERT INTO users (firstName, lastName) VALUES('Agada', 'Innocent') RETURNING id;", (err, response) => {
        res.send(response);
      });
    } catch (e) {
      res.send({
        status: 500,
        message: e.message,
      }).status(500);
    } finally {
      client.release();
    }
  })();
};
