import axios from 'axios';
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

describe('Location Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState().location).to.be.deep.equal({
      address: '',
      latitude: [],
      longitude: []
    });
  });



  describe('Google Maps AJAX requests', () => {
    describe('Geo Location', () => {
      xit('makes calls to the google Geo Location server', () => {});
      xit('uses the secret api key in the call', () => {});
      xit('pulls the latitude for based on cell tower info', () => {});
      xit('pulls the longitude for based on cell tower info', () => {});
    }); // end describe('Geo Location')
    describe('Geo Coding', () => {
      xit('makes calls to the google Geo Coding server', () => {});
      xit('uses the secret api key in the call', () => {});
      xit('pulls the latitude for a given address', () => {});
      xit('pulls the longitude for a given address', () => {});
    }); // end describe('Geo Coding')
  }); // end describe('Google Maps AJAX requests')
}); // end describe('Location Reducer')
