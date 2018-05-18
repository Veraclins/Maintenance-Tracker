import { Router } from 'express';
// import users from './storage/users';

const routes = Router();

// // Routes
routes.get('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});

// routes.get('/users', (req, res) => {
//   res.send({ users });
// });

// routes.get('/users/:id', (req, res) => {
//   const user = users.find(c => c.id === parseInt(req.params.id, 10));
//   if (!user) return res.status(404)
// .send({ message: `A user with the id ${req.params.id} does not exist` });
//   return res.send(user);
// });

// routes.post('/users', (req, res) => {
//   const user = {
//     id: users.length + 1,
//     name: req.body.name,
//     role: 'User',
//   };
//   users.push(user);
//   res.send(user);
// });

export default routes;
