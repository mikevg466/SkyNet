import axios from 'axios';
import { browserHistory } from 'react-router';

//------- ACTIONS -------
const SET_HISTORY = 'SET_HISTORY';
const ADD_HISTORY = 'ADD_HISTORY';

// ------ ACTION CREATORS -------
export const setHistory = addressList => ({ type: SET_HISTORY, addressList });
export const addHistory = address => ({ type: ADD_HISTORY, address });

// ------- INIT STATE --------
const initState = {
  history: []
};


// ------- REDUCERS ------------
export default function (state = initState, action) {
  const newState = Object.assign({}, state );
  switch (action.type) {

    case SET_HISTORY:
      newState.history = action.addressList;
      break;

    case ADD_HISTORY:
      newState.history = [action.address].concat(newState.history);
      break;

    default:
      break;
  }
  return newState;
}


// -------- DISPATCHERS -----------
export const saveQuery = () =>
  (dispatch, getStore) => {
    const curStore = getStore();
    const user = curStore.user;
    const address = curStore.location.address;
    return axios.post(`/api/user/query/${ user.id }`, { address })
      .then(() => dispatch(addHistory(address)))
      .catch(console.error.bind(console));
  }

export const getQueries = () =>
  dispatch => {
    const user = getStore().user;
    return axios.get(`/api/user/query/${ user.id }`)
      .then(res => res.data)
      .then(queries => {
        queries.sort((a,b) => b.id - a.id);
        const addressList = queries.map(query => query.address)
        dispatch(setHistory(addressList));
      })
      .catch(console.error.bind(console));
  }
