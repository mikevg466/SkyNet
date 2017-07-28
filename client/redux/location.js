import axios from 'axios';
import { browserHistory } from 'react-router';
import { GOOGLE_GEOLOCATION_SECRET } from '../secrets';

//------- ACTIONS -------
const SET_LOCATION = 'SET_LOCATION';

// ------ ACTION CREATORS -------
const setLocation = (address, latitude, longitude) => ({
  type: SET_LOCATION,
  address,
  latitude,
  longitude
});

// ------- INIT STATE --------
const initState = {
  address: '',
  latitude: '',
  longitude: ''
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {

    case SET_LOCATION:
      newState.address = action.address;
      newState.latitude = action.latitude;
      newState.longitude = action.longitude;
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const getCurrentLocation = () =>
  dispatch =>
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${ GOOGLE_GEOLOCATION_SECRET }`, {considerIp: "true"})
      .then(res => res.data)
      .then(data => {
        const { lat, lng } = data.location;
        return axios.post(`/api/proxy/location/geocode/latlng`, { lat, lng });
      })
      .then(res => res.data)
      .then(data => {
        const { formatted_address, geometry } = data.results[0];
        const { lat, lng } = geometry.location;
        return dispatch(setLocation(formatted_address, lat, lng));
      })
      .catch(console.error.bind(console));

export const getCoordinates = address =>
  dispatch =>
    axios.post(`/api/proxy/location/geocode/address`, { address })
      .then(res => {
        return res.data
      })
      .then(data => {
        const { formatted_address, geometry } = data.results[0];
        const { lat, lng } = geometry.location;
        return dispatch(setLocation(formatted_address, lat, lng));
      })
      .catch(console.error.bind(console));
