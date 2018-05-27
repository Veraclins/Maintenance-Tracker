import { Router } from 'express';
import { celebrate } from 'celebrate';
import { requestValidator } from '../../validations';


const usersRoute = Router();

// Used for routes that start with /api/v1/users
// /api/v1/users is already prepended to the route
// Used by logged in users only


usersRoute.get('/requests', (req, res) => {
  res.send({ message: 'get all the requests for a logged in user' });
});

usersRoute.post('/requests', celebrate(requestValidator), (req, res) => {
  res.send({ message: 'create a request' });
});

usersRoute.get('/requests/:requestId', (req, res) => {
  res.send({ message: 'get a given request' });
});
usersRoute.put('/requests/:requestId', (req, res) => {
  res.send({ message: 'update a given request' });
});

export default usersRoute;
