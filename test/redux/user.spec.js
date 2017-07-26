import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

const db = require('../../server/db');
const User = require('../../server/db/models/user');

const testUser = {
  email: 'deathbots@bots.com',
  password: 'bots'
};

describe('User Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState().user).to.be.deep.equal({
      id: 0,
      email: '',
      password: '',
    });
  });

  describe('GET_USER', () => {
    it('sets the user to the input user', () => {
      testStore.dispatch({
        type: 'GET_USER',
        user: testUser,
      });
      const newState = testStore.getState().user;
      Object.keys(testUser).forEach(key => {
        expect(newState[key]).to.equal(testUser[key])
      })
    });
  }); // end describe('LOAD_USER')

}); // end describe('User reducer')
