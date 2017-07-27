import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const SET_LOCATION = 'SET_LOCATION';

// ------ ACTION CREATORS -------
const setLocation = (address, latitude, longitude) => {
  type: SET_LOCATION,
  latitude,
  longitude
};

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
    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${ process.env.GOOGLE_GEOLOCATION_SECRET }`, {considerIp: "true"})
      .then(res => res.data)
      .then(data => {
        const { lat, lng } = data.location;
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ lat },${ lng }&key=${ process.env.GOOGLE_GEOCODING_SECRET }`);
      })
      .then(res => res.data)
      .then(data => {
        const { formatted_address, geometry } = data.results[0];
        const { lat, lng } = geometry.location;
        dispatch(setLocation(formatted_address, lat, lng));
      })
      .catch(console.error.bind(console));

export const getCoordinates = address =>
  dispatch =>
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ address }&key=${ process.env.GOOGLE_GEOCODING_SECRET }`)
      .then(res => res.data)
      .then(data => {
        const { formatted_address, geometry } = data.results[0];
        const { lat, lng } = geometry.location;
        dispatch(setLocation(formatted_address, lat, lng));
      })
      .catch(console.error.bind(console));
