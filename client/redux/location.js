import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------

// ------ ACTION CREATORS -------

// ------- INIT STATE --------
const initState = {
  address: '',
  latitude: [],
  longitude: []
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {



    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
