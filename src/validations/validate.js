
export const validateUser = (req, res, next) => {
  const errors = {};
  const input = req.body;
  const user = {};

  // Removes empty spaces
  Object.entries(input).forEach(([key, value]) => {
    user[key] = value.trim();
  });
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirmation,
    dept,
    employeeCode,
  } = user;
  // Checks that all fields are present
  const required = ['firstName', 'lastName', 'email', 'password', 'passwordConfirmation', 'dept', 'employeeCode'];
  required.forEach((element) => {
    if (!(element in user)) {
      errors[element] = `${element} is required`;
    }
  });
  if (Object.keys(errors).length !== 0) {
    res.status(400).send(errors);
  } else {
    if (firstName.length < 3 || !/[A-Z][a-z]/.test(firstName)) {
      errors.firstName = 'must be string and at least three characters';

    // regex gotten from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    }

    if (email.length < 3 || !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
      errors.email = 'must be a valid email';
    }

    if (lastName.length < 3 || !/[A-Z][a-z]/.test(lastName)) {
      errors.lastName = 'must be string and at least three characters';
    }

    if (password.length < 6) {
      errors.password = 'must be at least six characters';
    }

    if (password !== passwordConfirmation) {
      errors.passwordConfirmation = 'must match password';
    }

    if (dept.length < 5 || !/[A-Z][a-z]\s*/.test(dept)) {
      errors.dept = 'must be string(only letters) and at least five characters';
    }

    if (!/[A-Z]{2}\d{3}/g.test(employeeCode)) {
      errors.employeeCode = 'must be in the form AB123';
    }

    if (Object.keys(errors).length !== 0) {
      res.status(400).send(errors);
    } else {
      next();
    }
  }
};

export const validateRequest = (req, res, next) => {
  const errors = {};
  const input = req.body;
  const request = {};

  // Removes empty spaces
  Object.entries(input).forEach(([key, value]) => {
    request[key] = value.trim();
  });
  const {
    title,
    duration,
    description,
  } = request;
  // Checks that all fields are present
  const required = ['title', 'duration', 'description'];
  required.forEach((element) => {
    if (!(element in request)) {
      errors[element] = `${element} is required`;
    }
  });
  if (Object.keys(errors).length !== 0) {
    res.status(400).send(errors);
  } else {
    if (title.length < 10 || !/[A-Z][a-z]/.test(title)) {
      errors.title = 'must be string and at least 10 characters';
    }

<<<<<<< HEAD
    if (!/\d/.test(duration)) {
      errors.duration = 'must be a number';
=======
    if (!/\d{2}/.test(duration)) {
      errors.duration = 'must be number and not more than 2 digits';
>>>>>>> 0857471169b6fd4e6a8b7f5bd3adb9965e93265c
    }

    if (description.length < 20 || !/[A-Za-z0-9\s_.,!"()?@'/$]*/.test(description)) {
      errors.description = 'must be string(only letters) and at least five characters';
    }

    if (Object.keys(errors).length !== 0) {
      res.status(400).send(errors);
    } else {
      next();
    }
  }
};

