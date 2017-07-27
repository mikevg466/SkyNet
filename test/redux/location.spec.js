import axios from 'axios';
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

const testLocation = {
  address: 'Westeros',
  latitude: '31.12',
  longitude: '-123.34'
}

describe('Location Reducer', () => {
  let testStore;
  beforeEach('Create testing store', () => {
    testStore = createStore(combineReducer, applyMiddleware(thunkMiddleware));
  });

  it('has expected initial state', () => {
    expect(testStore.getState().location).to.be.deep.equal({
      address: '',
      latitude: '',
      longitude: ''
    });
  });

  /* For AJAX calls to Google APIs:
    For Search Bar:
      use Geo Coding when passed address in search bar
          https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


    For Geo Location Finder:
      user Geo Location API to get latitude and longitude for current location
          https://www.googleapis.com/geolocation/v1/geolocate?key=YOUR_API_KEY
      Then use Reverse Geo Coding when using latitude and longitude for location finder
          https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY


    both should then set store with address, latitude, and longitude from resulting information
  */
  describe('SET_LOCATION', () => {
    it('sets the address, latitude, and longitude based on the input', () => {
      testStore.dispatch({
        type: 'SET_LOCATION',
        address: testLocation.address,
        latitude: testLocation.latitude,
        longitude: testLocation.longitude,
      });
      const newState = testStore.getState().location;
      Object.keys(testLocation).forEach(key => {
        expect(newState[key]).to.equal(testLocation[key])
      })
    });
  }); // end describe('SET_LOCATION')

}); // end describe('Location Reducer')
