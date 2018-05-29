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
          const { id, role } = response.rows[0];
          const user = {
            id,
            role,
          };
          const token = createToken(user);
          res.send({ auth: true, token });
        })
        .catch(err => res.send({ auth: false, error: err.message }));
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
          const passwordIsValid = bcrypt.compareSync(password, request.password);
          if (!passwordIsValid) {
            res.status(401).send({ auth: false, token: null, message: 'Please check your details and try again' });
          } else {
            const { id, role } = request;
            const user = {
              id,
              role,
            };
            const token = createToken(user);
            res.send({ auth: true, token });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const create = (req, res) => {
  const { id, role } = req.header;
  const user = {
    id,
    role,
  };
  const token = createToken(user);
  res.send({ auth: true, token });
};
