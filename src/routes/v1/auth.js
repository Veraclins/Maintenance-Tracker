import { Router } from 'express';
import { signUp, login } from '../../controllers/auth';
import { validateUser } from '../../validations/validate';

const authRoute = Router();

// Used for routes that start with /api/v1/auth
// /api/v1/auth is already prepended to the route
// Used for signup and signin


authRoute.post('/signup', validateUser, signUp);

authRoute.post('/login', login);

export default authRoute;
