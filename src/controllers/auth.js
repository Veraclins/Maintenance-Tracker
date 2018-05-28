import pool from '../database';
/* eslint */
export const signUp = (req, res) => {
  (async () => {
    const {
      email, firstName, lastName, dept, password, employeeCode,
    } = req.body;
    const query = {
      text: 'INSERT INTO users (email, first_name, last_name, dept, password, employee_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [email, firstName, lastName, dept, password, employeeCode],
    };
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          const request = response.rows[0];
          res.send(request);
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const login = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const client = await pool.connect();
    try {
      await client.query('SELECT * FROM requests WHERE (id=($1) AND users_id=($2))', [requestId, 2])
        .then((response) => {
          const request = response.rows[0];
          if (request !== null && typeof request === 'object') {
            res.send(request);
          } else {
            res.status(404).send({
              status: 'Bad request',
              message: "You don't seem to have a request with the given value. Please check again",
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};
