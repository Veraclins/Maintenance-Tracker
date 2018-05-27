import { Router } from 'express';
import usersRoute from './users';
import adminRoute from './admin';
import authRoute from './auth';
import dataRoute from './data';

const routes = Router();


// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

routes.all('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});

routes.use('/users', usersRoute);
routes.use('/requests', adminRoute);
routes.use('/auth', authRoute);
routes.use('/data', dataRoute);


export default routes;
