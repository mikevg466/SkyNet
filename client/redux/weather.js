import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const SET_FORECAST = 'SET_FORECAST';
const SET_HISTORIC = 'SET_HISTORIC';

// ------ ACTION CREATORS -------
const setForecast = (current, forecast) => {
  type: SET_FORECAST,
  current,
  forecast
};
const setHistoric = historic => { type: SET_HISTORIC, historic };

// ------- INIT STATE --------
const initState = {
  current: {},
  forecast: [],
  historic: []
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {

    case SET_FORECAST:
      newState.current = action.current;
      newState.forecast = action.forecast;
      break;

    case SET_HISTORIC:
      newState.historic = action.historic;
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
