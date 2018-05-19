import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';
import users from '../src/storage/users';

const expect = chai.expect; // eslint-disable-line prefer-destructuring
chai.use(chaiHttp);

describe('Root route, /v1/', () => {
  it('responds with status 200', (done) => {
    chai.request(server)
      .get('/v1/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Sees the response body', (done) => {
    chai.request(server)
      .get('/v1/')
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        done();
      });
  });
});

describe('POST to /v1/users', () => {
  const user = {
    id: 1,
    name: 'Agada Clinton',
    email: 'agadaclinton@gmail.com',
    password: 'password',
    user_code: 'AD001',
    dept: 'Web-development',
    role: 'admin',
    token: '',
  };
  it('responds with status 200', (done) => {
    chai.request(server)
      .post('/v1/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('it should create a user and return it', (done) => {
    chai.request(server)
      .post('/v1/users')
      .send({ user })
      .end((err, res) => {
        expect(users).to.be.an('array').that.is.not.empty; // eslint-disable-line no-unused-expressions
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('name');
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.property('password');
        done();
      });
  });
});
