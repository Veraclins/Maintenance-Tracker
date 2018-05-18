import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';

describe('Root', () => {
  it('should return ok', () => request(app)
    .get('/v1/')
    .then(async (res) => {
      expect(res.status).to.equal(200);
      // expect(res.body).to.include('Welcome');
    }));
});
