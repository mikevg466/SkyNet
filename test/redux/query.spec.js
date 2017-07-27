import axios from 'axios';
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

const testHistory = [
    'Westeros',
    'Kanto Region',
]
const testAddress = 'Indigo Region';

describe('Query Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState().query).to.be.deep.equal({
      history: []
    });
  });

  describe('SET_HISTORY', () => {
    it('sets history based on the addressList input', () => {
      testStore.dispatch({
        type: 'SET_HISTORY',
        addressList: testHistory
      });
      const newState = testStore.getState().query;
      expect(newState.history).to.deep.equal(testHistory);
    });
  }); // end describe('SET_HISTORY')

    describe('ADD_HISTORY', () => {
      it('prepends address to the list of historic queries', () => {
        testStore.dispatch({
          type: 'SET_HISTORY',
          addressList: testHistory
        });
        testStore.dispatch({
          type: 'ADD_HISTORY',
          address: testAddress
        });
        const newState = testStore.getState().query;
        const newTest = [testAddress].concat(testHistory);
        expect(newState.history).to.deep.equal(newTest);
      });
    }); // end describe('ADD_HISTORY')

}); // end describe('Query Reducer')
