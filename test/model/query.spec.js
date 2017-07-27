const chai = require('chai');
const chaiProperties = require('chai-properties');
const chaiThings = require('chai-things');
chai.use(chaiProperties);
chai.use(chaiThings);
const expect = chai.expect;
const db = require('../../server/db');
const Query = db.model('query');

describe('Query model', () => {

  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('field definitions', () => {

    let testQuery;
    beforeEach('create database', () => {
      return db.sync({force: true})
      .then(() =>
        Query.create({
          address: 'king\'s landing, Westeros'
        })
      )
      .then(query => {
        testQuery = query;
      });
    });

    it('should have a address field', () => {
      expect(testQuery.address).to.be.a('string');
      expect(testQuery.address).to.equal('king\'s landing, Westeros');
    });
  }); // end describe('field definitions')

  describe('validations', () => {
    it('Requires a address field', () => {
      const user = Query.build({
      });
      return user.validate()
        .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
                path: 'address',
                type: 'notNull Violation'
            });
        });
    });
  }); // end describe('validations')

}); // end describe('Query model')
