import bcrypt from 'bcrypt';
import pool from '../database';
import { createToken } from '../middlewares/jwt';


export const signUp = (req, res) => {
  (async () => {
    const {
      email, firstName, lastName, dept, password, employeeCode,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const query = {
      text: 'INSERT INTO users (email, first_name, last_name, dept, password, employee_code) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
      values: [email, firstName, lastName, dept, hashedPassword, employeeCode],
    };
    const client = await pool.connect();
    try {
      await client.query(query)
        .then((response) => {
          const { id } = response.rows[0];
          const user = {
            id,
            firstName,
            lastName,
          };
          const token = createToken(user);
          res.send({ token });
        })
        .catch(err => res.send({ error: err.message }));
    } finally {
      client.release();
    }
  })();
};

export const login = (req, res) => {
  (async () => {
    const { email, password } = req.body;
    const client = await pool.connect();
    try {
      await client.query('SELECT * FROM users WHERE email=($1)', [email])
        .then((response) => {
          const request = response.rows[0];
          if (request) {
            const passwordIsValid = bcrypt.compareSync(password, request.password);
            if (!passwordIsValid) {
              res.status(401).send({ error: 'Please check your details and try again' });
            } else {
              const { id } = request;
              const firstName = request.first_name;
              const lastName = request.last_name;
              const user = {
                id,
                firstName,
                lastName,
              };
              const token = createToken(user);
              res.send({ token });
            }
          } else {
            return res.status(401).send({ error: 'Please check your details and try again' });
          }
        })
        .catch(err => res.send(err.message));
    } catch (err) {
      return res.status(500).send({ error: err.message });
    } finally {
      client.release();
    }
  })();
};
