import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mjc2MjUwOTMsImV4cCI6MTUyNzcxMTQ5M30.9MydT_vVmKD2RZ4aN7A5-GMxp7vTSbQ59MMYkGBe7DY';
describe('Root route, /api/v1/', () => {
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
  it('Creates a new users table', (done) => {
    chai.request(server)
      .get('/api/v1/data/create-users')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe('GET request to /api/v1/data/populate-requests', () => {
  it('Creates a new requests table', (done) => {
    chai.request(server)
      .get('/api/v1/data/create-requests')
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
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('auth', true);
        expect(res.body).to.have.property('token').that.is.not.empty();
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

  it('it should return error and 401 if the password is wrong', (done) => {
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
        expect(res.body).to.have.property('message').that.contains("You don't seem to have a request with the given value. Please check again");
        done();
      });
  });
});

describe('PUT request to /api/v1/users/requests/:requesId', () => {
  it('it should update a requests and return it', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/2')
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
        expect(res.body).to.have.property('message').that.contains("You don't seem to have a request with the given value. Please check again");
        done();
      });
  });
});

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Mjc2Mjc5NDgsImV4cCI6MTUyNzcxNDM0OH0.Vr57yTI3XFHPe3QlFuBXmy2DuIlp6qv3yoiobW9bnxA';

describe('GET request to /api/v1/requests', () => {
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
      .get('/api/v1/requests/2/approve')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/approve')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/approve')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/disapprove', () => {
  it('Disapprove a request and return it', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/disapprove')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/disapprove')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/disapprove')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('GET request to /api/v1/requests/2/resolve', () => {
  it('Resolve a request and return it', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/resolve')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Returns forbidden if the user is not an admin', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/resolve')
      .set('x-access-token', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Returns error if no token is supplied', (done) => {
    chai.request(server)
      .get('/api/v1/requests/2/resolve')
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
