const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server');
const User = db.model('user');

const mikesEmail = 'mike@bashbots.com';
let mike;

describe('User routes', () => {

  beforeEach('Sync and load Database', () => {
    return db.sync({ force: true })
    .then(() => User.create({
        email: mikesEmail,
        password: 'test',
      })
    )
    .then(user => {
      mike = user;
    });
  });

  describe('/api/users/', () => {
    it('GET all users through /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(mikesEmail);
        });
    });
  }); // end describe('/api/users')

  describe('/api/users/:userId', () => {
     it('GET one user including item association through /api/users/:userId', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body.email).to.be.equal(mikesEmail);
        });
    });
  }); // end describe('/api/users/:userId')
}); // end describe('User routes')
