import { Router } from 'express';
import users from './storage/users';

const routes = Router();

// Routes
routes.get('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});

routes.post('/users', (req, res) => {
  const token = Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15);
  const user = {
    id: 1,
    name: 'Agada Clinton',
    email: 'agadaclinton@gmail.com',
    password: 'password',
    user_code: 'AD001',
    dept: 'Web-development',
    role: 'admin',
    token,
  };
  users.push(user);
  res.send(user);
});

export default routes;
