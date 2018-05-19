import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../src/index';

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
