import pool from '../database';

export const adminGetAllRequests = (req, res) => {
  (async () => {
    const client = await pool.connect();
    const data = [];
    try {
      client.query('SELECT * FROM requests ORDER BY ID ASC')
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

export const approveRequest = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE id=($2) RETURNING *',
      values: ['approved', requestId],
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
              status: 'Not Found',
              message: 'The given requestId does not exist. Please check again',
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const disapproveRequest = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE id=($2) RETURNING *',
      values: ['disapproved', requestId],
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
              status: 'Not Found',
              message: 'The given requestId does not exist. Please check again',
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};

export const resolveRequest = (req, res) => {
  (async () => {
    const { requestId } = req.params;
    const query = {
      text: 'UPDATE requests SET status=($1) WHERE id=($2) RETURNING *',
      values: ['resolved', requestId],
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
              status: 'Not Found',
              message: 'The given requestId does not exist. Please check again',
            });
          }
        })
        .catch(err => res.send(err.message));
    } finally {
      client.release();
    }
  })();
};
