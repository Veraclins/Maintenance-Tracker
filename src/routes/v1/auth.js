import { Router } from 'express';
import { celebrate } from 'celebrate';
import { signUp, login, create } from '../../controllers/auth';
import { userValidator, loginValidator } from '../../validations';

const authRoute = Router();

// Used for routes that start with /api/v1/auth
// /api/v1/auth is already prepended to the route
// Used for signup and signin


authRoute.post('/signup', celebrate(userValidator), signUp);

authRoute.post('/login', celebrate(loginValidator), login);

authRoute.post('/create-token', create);

export default authRoute;
