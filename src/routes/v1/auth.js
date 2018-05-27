import { Router } from 'express';

const authRoute = Router();

// Used for routes that start with /api/v1/auth
// /api/v1/auth is already prepended to the route
// Used for signup and signin


authRoute.get('/signup', (req, res) => {
  res.send({ message: 'auth signup' });
});

authRoute.post('/login', (req, res) => {
  res.send({ message: 'auth login' });
});

export default authRoute;
