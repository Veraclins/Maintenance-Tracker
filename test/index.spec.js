import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

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
  it('it should create a request and return it', (done) => {
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
  it('it should create a request and return it', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send({
        email: 'andela@test.com',
        password: 'password',
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

describe('POST request to /api/v1/users/requests', () => {
  it('it should create a request and return it', (done) => {
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
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
        done();
      });
  });
});

describe('GET request to /api/v1/users/requests', () => {
  it('Returns a status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Returns all requests of the logged in user', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests')
      .end((err, res) => {
        expect(res.body).to.have.lengthOf.at.least(1);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

describe('GET request to /api/v1/users/requests/:requestId', () => {
  it('Returns a status code of 200', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/2')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .get('/api/v1/users/requests/20')
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
