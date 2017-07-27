import axios from 'axios';
import { expect } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import combineReducer from '../../client/redux';
import thunkMiddleware from 'redux-thunk';

const testWeather = {
  current: { type: 'sunny', temp: '70' },
  forecast: [{ type: 'cloudy', temp: '60' }, { type: 'rainy', temp: '65' }],
  historic: [{ type: 'snowy', temp: '30' }, { type: 'cloudy', temp: '40' }, { type: 'snowy', temp: '31' }]
};

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

    /* For AJAX calls to DarkSky APIs:
      For Current and Forecasted Weather:
        use forecast api call which pulls current weather and future days
            https://api.darksky.net/forecast/[key]/[latitude],[longitude]


      For Historic Weather:
        user forecast call plus the specific times for the days you want to pull info for
            https://api.darksky.net/forecast/[key]/[latitude],[longitude],[time]

    */
    describe('SET_FORECAST', () => {
      it('sets the current weather and forecast weather', () => {
        testStore.dispatch({
          type: 'SET_FORECAST',
          current: testWeather.current,
          forecast: testWeather.forecast,
        });
        const newState = testStore.getState().weather;
        expect(newState.current).to.deep.equal(testWeather.current);
        expect(newState.forecast).to.deep.equal(testWeather.forecast);
      });
    }); // end describe('SET_FORECAST')

    describe('SET_HISTORIC', () => {
      it('sets the historic weather', () => {
        testStore.dispatch({
          type: 'SET_HISTORIC',
          historic: testWeather.historic,
        });
        const newState = testStore.getState().weather;
        expect(newState.historic).to.deep.equal(testWeather.historic);
      });
    }); // end describe('SET_HISTORIC')

}); // end describe('Weather Reducer')
