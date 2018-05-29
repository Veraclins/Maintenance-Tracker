import { Router } from 'express';
import usersRoute from './users';
import adminRoute from './admin';
import authRoute from './auth';
import dataRoute from './data';
import { verifyToken } from '../../middlewares/jwt';
import isAdmin from '../../middlewares/admin';

const routes = Router();


// Used for routs that start with /api/v1
// /api/v1 is already prepended to the route

routes.all('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});

routes.use('/users', verifyToken, usersRoute);

routes.use('/requests', verifyToken, isAdmin, adminRoute);

routes.use('/auth', authRoute);

routes.use('/data', dataRoute);


export default routes;
