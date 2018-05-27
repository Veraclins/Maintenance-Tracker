import { Router } from 'express';
import { createDatabase, createTable, createUser, dropTable } from '../../controllers/data';


const dataRoute = Router();

// This is for my personal convenience. A way to easily manage the database
// /api/v1/data is already prepended to the route
// Used by logged in data only


dataRoute.get('/database', createDatabase);
dataRoute.get('/table', createTable);
dataRoute.get('/drop', dropTable);
dataRoute.get('/create', createUser);

export default dataRoute;
