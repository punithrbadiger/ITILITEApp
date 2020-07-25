import {SIGN_UP_DETAILS, LOGIN_SUCCESS, SIGNOUT_USER} from '../type';
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
    default:
      return state;
  }
};
