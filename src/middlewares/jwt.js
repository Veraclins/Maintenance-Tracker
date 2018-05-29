import jwt from 'jsonwebtoken';

export function createToken(user) {
  const { id, role } = user;
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ id, role }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });
  return token;
}

/* eslint-disable consistent-return */
export const verifyToken = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const secret = process.env.JWT_SECRET;
  try {
    if (!token) {
      return res.status(400).send({
        status: 'Error',
        message: 'You must supply a token',
      });
    }

    jwt.verify(token, secret, (err, decoded) => {
      const { id, role } = decoded;
      req.user = { id, role };
      next();
    });
  } catch (err) {
    next(err);
  }
};
