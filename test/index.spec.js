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
        expect(res.body).to.have.property('message').that.contains('There is no request with the id 20');
        done();
      });
  });
});

describe('POST request to /api/v1/users/requests', () => {
  const request = {
    user_dept: 'Web-development',
    title: 'General repainting',
    details: `Check to see if the array has a length of 0. 
    Each time an element is added to an array the length is increased. 
    Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
    duration: '7 days',
  };
  it('it should create a user and return it', (done) => {
    chai.request(server)
      .post('/api/v1/users/requests')
      .send(request)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user_id', 2);
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('id', 4);
        done();
      });
  });
});

describe('PUT request to /api/v1/users/requests/:requesId', () => {
  const request = {
    user_dept: 'Web-development',
    title: 'General repainting',
    details: `Check to see if the array has a length of 0. 
    Each time an element is added to an array the length is increased. 
    Arrays have a .length property that can easily be checked in a boolean statement like if(arr.length === 0) console.log`,
    duration: '7 days',
  };
  it('it should update a user and return it', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/3')
      .send(request)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('user_id', 2);
        expect(res.body).to.have.property('title');
        expect(res.body).to.have.property('id', 3);
        done();
      });
  });

  it('Returns status 404 and an error message when an id that does not exist is provided', (done) => {
    chai.request(server)
      .put('/api/v1/users/requests/20')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message').that.contains('There is no request with the id 20');
        done();
      });
  });
});

