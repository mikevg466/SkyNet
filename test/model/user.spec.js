const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const db = require('../../server/db');
const User = db.model('user');

describe('User model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('field definitions', () => {

    let testUser;
    beforeEach('create database', () => {
      return db.sync({force: true})
      .then(() =>
        User.create({
          email: 'mike@mikey.michael',
          password: 'password',
        })
      )
      .then((user) => {
        testUser = user;
      });
    });

    it('should have a email field', () => {
      expect(testUser.email).to.be.a('string');
      expect(testUser.email).to.equal('mike@mikey.michael');
    });
  });

  describe('validations', () => {
    it('Requires a email field', () => {
      const user = User.build({
        password: 'password'
      });
      return user.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'email',
                type: 'notNull Violation'
            });
        });
    });
    it('Requires a password field', () => {
      const user = User.build({
        email: 'mike@mikey.michael'
      });
      return user.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'password',
                type: 'notNull Violation'
            });
        });
    });
  });

  describe('instanceMethods', () => {

    describe('correctPassword', () => {

      let cody;

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'

        })
          .then(user => {
            cody = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });


    }); // end describe('correctPassword')

  }); // end describe('instanceMethods')

}); // end describe('User model')
