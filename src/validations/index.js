import { Joi, isCelebrate } from 'celebrate';

export const userValidator = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    dept: Joi.string().required(),
    password: Joi.string().min(3).max(15).required(),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required()
      .options({ language: { any: { allowOnly: 'must match password' } } }),
    employeeCode: Joi.string().length(5).required(),
  }),
};

export const requestValidator = {
  body: Joi.object().keys({
    title: Joi.string().min(10).required(),
    duration: Joi.number().required(),
    description: Joi.string().min(20).required(),
  }),
};

// My very first middleware ever! Inspired by arb/celebrate error handler
export const validationError = (err, req, res, next) => {
  if (isCelebrate(err)) {
    // Joi uses double quotes in its error messages and this gets escaped in json
    // This results in ugly messages like '\"title\" is not allowed to be empty'
    const message = err.message.replace(/"/g, "'");
    const error = {
      statusCode: 400,
      error: 'Bad Request',
      message,
    };
    return res.status(400).send(error);
  }
  // If this isn't a Celebrate error, send it to the next error handler
  return next(err);
};

