import { Router } from 'express';

const adminRoute = Router();

// Used for routes that start with /api/v1/requests
// /api/v1/requests is already prepended to the route
// Thes routes are only available to the admin(s)


adminRoute.get('/', (req, res) => {
  res.send({ message: 'get all requests' });
});

adminRoute.put('/:requestId/approve', (req, res) => {
  res.send({ message: 'approve a request' });
});

adminRoute.put('/:requestId/disapprove', (req, res) => {
  res.send({ message: 'disapprove a request' });
});
adminRoute.put('/:requestId/resolve', (req, res) => {
  res.send({ message: 'resolve a request' });
});

export default adminRoute;
