import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const SET_FORECAST = 'SET_FORECAST';
const SET_HISTORIC = 'SET_HISTORIC';
const ADD_HISTORIC = 'ADD_HISTORIC';

// ------ ACTION CREATORS -------
const setForecast = (current, forecast) => ({
  type: SET_FORECAST,
  current,
  forecast
});
const setHistoric = historic => ({ type: SET_HISTORIC, historic });
const addHistoric = historicDay => ({ type: ADD_HISTORIC, historicDay });


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

    case ADD_HISTORIC:
      newState.historic = newState.historic.slice();
      newState.historic.push(action.historicDay);
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const getForecast = (lat, lng) =>
  dispatch =>
    axios.post(`/api/proxy/forecast`, { lat, lng })
      .then(res => res.data)
      .then(data => {
        const { currently, daily } = data;
        const dailyForecast = daily.data;
        return dispatch(setForecast(currently, dailyForecast));
      })
      .catch(console.error.bind(console));

export const getHistoricDay = (lat, lng, time) =>
  dispatch =>
    axios.get(`https://api.darksky.net/forecast/${ DARK_SKY_SECRET }/${ lat },${ lng },${ time }`)
      .then(res => res.data)
      .then(data => {
        const historicDay = data.daily.data[0];
        return dispatch(addHistoric(historicDay));
      })
      .catch(console.error.bind(console));
