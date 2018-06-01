import pool from '../database';

/* eslint-disable consistent-return */

export const isAdmin = (req, res, next) => {
  const { id } = req.user;
  (async () => {
    const client = await pool.connect();
    try {
      await client.query('SELECT * FROM users WHERE id=($1)', [id])
        .then((response) => {
          const request = response.rows[0];
          if (request && request.role !== 'Admin') {
            return res.status(403).send({ message: 'You are not authorized to perform this operation' });
          }
          next();
        })
        .catch(err => res.status(500).send({ error: err.message }));
    } finally {
      client.release();
    }
  })();
};

export default isAdmin;
