import pool from '../database';

export const getAllRequests = (req, res) => {
  (async () => {
    const client = await pool.connect();
    const data = [];
    try {
      client.query('SELECT * FROM requests WHERE users_id=($1) ORDER BY ID ASC', [2])
        .then((response) => {
          const { rows } = response;
          rows.forEach((row) => {
            data.push(row);
          });
          res.send(data);
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const createRequest = (req, res) => {
  (async () => {
    const { title, duration, description } = req.body;
    const query = {
      text: 'INSERT INTO requests (users_id, title, duration, description) VALUES($1, $2, $3, $4) RETURNING *',
      values: [2, title, duration, description],
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

export const getRequestById = (req, res) => {
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

export const UpdateRequest = (req, res) => {
  (async () => {
    const { title, duration, description } = req.body;
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET title=($1), duration=($2), description=($3) WHERE (id=($4) AND users_id=($5)) RETURNING *',
      values: [title, duration, description, requestId, 2],
    };
    const client = await pool.connect();
    try {
      await client.query(query)
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
