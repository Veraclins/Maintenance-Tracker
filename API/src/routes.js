import { Router } from 'express';
import requests from './storage/requests';

const routes = Router();

// Routes
routes.get('/', (req, res) => {
  res.send({ message: 'Welcome to Maintenance Tracker API.' });
});

routes.get('/users/requests', (req, res) => {
  const request = [];
  requests.forEach((item) => {
    // This is to mimic a logged in user
    if (item.user_id === 2) {
      request.push(item);
    }
  });
  res.send(request);
});

routes.get('/users/requests/:requestId', (req, res) => {
  const request = [];
  requests.forEach((item) => {
    if (item.id === parseInt(req.params.requestId, 10)) {
      request.push(item);
    }
  });
  if (!request.length) {
    res.status(404).send({
      message: `There is no request with the id ${req.params.requestId}`,
    });
  } else {
    res.send(request);
  }
});

routes.post('/users/requests', (req, res) => {
  const request = {
    id: requests.length + 1,
    user_id: 2,
    user_dept: req.body.user_dept,
    title: req.body.title,
    details: req.body.details,
    duration: req.body.duration,
  };
  requests.push(request);
  res.send(request);
});

routes.put('/users/requests/:requestId', (req, res) => {
  const requestIndex = requests.findIndex(obj => obj.id === parseInt(req.params.requestId, 10));
  if (requestIndex === -1) {
    res.status(404).send({
      message: `There is no request with the id ${req.params.requestId}`,
    });
  } else {
    requests[requestIndex] = {
      id: parseInt(req.params.requestId, 10),
      user_id: 2,
      user_dept: req.body.user_dept,
      title: req.body.title,
      details: req.body.details,
      duration: req.body.duration,
    };
    res.send(requests[requestIndex]);
  }
});

export default routes;
