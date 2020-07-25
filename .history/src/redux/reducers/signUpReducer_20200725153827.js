import {
  SIGN_UP_DETAILS,
  LOGIN_SUCCESS,
  SIGNOUT_USER,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from '../type';
import {act} from 'react-test-renderer';

const INITIAL_STATE = {
  users: {},
  userLoggedIn: false,
  deviceAuthorized: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_DETAILS:
      const userId = action.payload.phone;

      return {
        ...state,
        users: {...state.users, [userId]: action.payload},
        deviceAuthorized: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        users: {...state.users, [userId]: action.payload},
        userLoggedIn: true,
        deviceAuthorized: true,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        userData: {},
        userLoggedIn: false,
      };
    case SET_LOADING_TRUE:
      return {...state, loading: true};
    case SET_LOADING_FALSE:
      return {...state, loading: false};
    default:
      return state;
  }
};
