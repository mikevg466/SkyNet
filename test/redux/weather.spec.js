import axios from 'axios';
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

describe('Weather Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState().weather).to.be.deep.equal({
      current: {},
      forecast: [],
      historic: []
    });
  });



  describe('DarkSky AJAX requests', () => {
    describe('Current Weather', () => {
      xit('makes calls to the darksky server', () => {});
      xit('uses the secret api key in the call', () => {});
      xit('pulls current weather for a given area', () => {});
    }); // end describe('Current Weather')
    // https://api.darksky.net/forecast/[key]/[latitude],[longitude]
    describe('Forecasted Weather', () => {
      xit('makes calls to the darksky server', () => {});
      xit('uses the secret api key in the call', () => {});
      xit('pulls forecasted weather for a given area', () => {});
    }); // end describe('Forecasted Weather')
    // https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]
    describe('Historic Weather', () => {
      xit('makes calls to the darksky server', () => {});
      xit('uses the secret api key in the call', () => {});
      xit('pulls historic weather for a given area', () => {});
    }); // end describe('Historic Weather')
  }); // end describe('DarkSky AJAX requests')
}); // end describe('Weather Reducer')
