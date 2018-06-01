import jwt from 'jsonwebtoken';

export function createToken(user) {
  const { id, firstName, lastName } = user;
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id, firstName, lastName }, secret, {
    expiresIn: 259200, // expires in 24 hours
  });
  return token;
}

/* eslint-disable consistent-return */
export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const secret = process.env.JWT_SECRET;
  try {
    if (!token) {
      res.status(400).send({ error: 'You must supply a token' });
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (decoded) {
          const { id, firstName, lastName } = decoded;
          req.user = { id, firstName, lastName };
          next();
        } else {
          res.status(401).send({ error: 'Your access may have expired. Please login again' });
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
