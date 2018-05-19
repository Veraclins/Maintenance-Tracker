import { Router } from 'express';


const routes = Router();

// Routes
routes.get('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});


export default routes;
