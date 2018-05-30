import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

let adminToken = '';
let token = '';
describe('Root route, /api/v1/', () => {
  it('redirects to /api/v1/', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('responds with status 200', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Sees the response body', (done) => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('GET request to /api/v1/data/drop-users', () => {
  it('Drops users table', (done) => {
    chai.request(server)
      .get('/api/v1/data/drop-users')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('GET request to /api/v1/data/drop-requests', () => {
  it('Drops requests table', (done) => {
    chai.request(server)
      .get('/api/v1/data/drop-requests')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('GET request to /api/v1/data/create-users', () => {
  it('Creates a new users table', (done) => {
    chai.request(server)
      .get('/api/v1/data/create-users')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('GET request to /api/v1/data/create-requests', () => {
  it('Creates a new requests table', (done) => {
    chai.request(server)
      .get('/api/v1/data/create-requests')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('GET request to /api/v1/data/populate-users', () => {
  it('Adds default users to users table', (done) => {
    chai.request(server)
      .get('/api/v1/data/populate-users')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('GET request to /api/v1/data/populate-requests', () => {
  it('Adds default requests to requests table', (done) => {
    chai.request(server)
      .get('/api/v1/data/populate-requests')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('POST request to /api/v1/auth/signup', () => {
  it('it should create a user and return a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'andela@test.com',
        firstName: 'Andela',
        lastName: 'Samuel',
        dept: 'Technical Services',
        password: 'password',
        passwordConfirmation: 'password',
        employeeCode: 'US006',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('auth', true);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('it should return error message and a status 400 if there are validation errors', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({
        email: 'andelacom',
        firstName: 'Andela',
        lastName: 'Samuel',
        dept: 'Technical Services',
        password: 'password',
        passwordConfirmation: 'password',
        employeeCode: 'US006',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

describe('POST request to /api/v1/auth/login', () => {
  it('it should login the user and return a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'innocent@test.com',
        password: 'password',
      })
      .end((err, res) => {
        token = res.body.token; // eslint-disable-line prefer-destructuring
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('auth', true);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('it should return error and 401 if the password is wrong', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'innocent@test.com',
        password: 'passworded',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('auth', false);
        expect(res.body).to.have.property('token', null);
        done();
      });
  });

  it('it should return error and 401 if the email is wrong', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'lovelteueue@test.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('auth', false);
        expect(res.body).to.have.property('token', null);
        done();
      });
  });
});

describe('POST request to /api/v1/users/requests', () => {
  it('it should create a request and return it', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .set('x-access-token', token)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });

  it('it should return an error if token is not supplied', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/users/requests', () => {
  it('Returns a status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Returns all requests of the logged in user', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/users/requests/:requestId', () => {
  it('Returns the request with the given id', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/2')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns error if the no token is provided', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/2')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/20')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('PUT request to /api/v1/users/requests/:requestId', () => {
  it('it should update a requests and return it', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/2')
      .set('x-access-token', token)
      .send({
        title: 'Excellent Work',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('users_id', 2);
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/20')
      .set('x-access-token', token)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('GET request to /api/v1/requests', () => {
  it('it should login an Admin and return a token', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'clinton@test.com',
        password: 'password',
      })
      .end((err, res) => {
        adminToken = res.body.token; // eslint-disable-line prefer-destructuring
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('auth', true);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('Returns all requests in the database for an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/requests')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/approve', () => {
  it('Approve a request and return it', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/approve')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/approve')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/approve')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/requests/20/approve')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/disapprove', () => {
  it('Disapprove a request and return it', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/disapprove')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/disapprove')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/disapprove')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/requests/20/disapprove')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/resolve', () => {
  it('Resolve a request and return it', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/resolve')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/resolve')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .put('/api/v1/requests/2/resolve')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/requests/20/resolve')
      .set('x-access-token', adminToken)
      .send({
        title: 'General repainting',
        description: `Check to see if the array has a length of 0. 
            Each time an element is added to an array the length is increased. 
            Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
        duration: 8,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
