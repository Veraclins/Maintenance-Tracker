import { Router } from 'express';
import { celebrate } from 'celebrate';
import { requestValidator } from '../../validations';
import { getAllRequests, createRequest, getRequestById, UpdateRequest } from '../../controllers/users';


const usersRoute = Router();

// Used for routes that start with /api/v1/users
// /api/v1/users is already prepended to the route
// Used by logged in users only


usersRoute.get('/requests', getAllRequests);

usersRoute.post('/requests', celebrate(requestValidator), createRequest);

usersRoute.get('/requests/:requestId', getRequestById);

usersRoute.put('/requests/:requestId', celebrate(requestValidator), UpdateRequest);

export default usersRoute;
