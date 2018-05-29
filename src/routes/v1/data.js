import { Router } from 'express';
import { createEnumType, createRequestsTable, dropUsersTable, dropRequestsTable, createUsersTable, populateUsers, populateRequests, getAllUsers, getAllRequests } from '../../controllers/data';


const dataRoute = Router();

// This is for my personal convenience. A way to easily manage the database
// /api/v1/data is already prepended to the route
// Used by logged in data only


dataRoute.get('/create-enum', createEnumType);

dataRoute.get('/create-requests', createRequestsTable);

dataRoute.get('/create-users', createUsersTable);

dataRoute.get('/drop-users', dropUsersTable);

dataRoute.get('/drop-requests', dropRequestsTable);

dataRoute.get('/populate-users', populateUsers);

dataRoute.get('/populate-requests', populateRequests);

dataRoute.get('/get-all-users', getAllUsers);

dataRoute.get('/get-all-requests', getAllRequests);

export default dataRoute;
