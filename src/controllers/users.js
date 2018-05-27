import pool from '../database';

export const getAllRequests = (req, res) => {
  (async () => {
    const client = await pool.connect();
    const data = [];
    try {
      await client.query('SELECT * FROM requests', (err, response) => {
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

export const createRequest = (req, res) => {
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

export const getRequestById = (req, res) => {
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

export const updateRequest = (req, res) => {
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
