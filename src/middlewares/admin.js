/* eslint-disable consistent-return */
const isAdmin = (req, res, next) => {
  const { role } = req.user;
  console.log(role);
  if (role === 'Admin') {
    next();
  } else {
    return res.status(403).send({
      status: 'Forbidden',
      message: 'You are not authorized to perform this operation',
    });
  }
};

export default isAdmin;
