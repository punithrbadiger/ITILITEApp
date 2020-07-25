import {SIGN_UP_DETAILS, LOGIN_SUCCESS} from '../type';
import {act} from 'react-test-renderer';

const INITIAL_STATE = {
  users: {},
  userLoggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP_DETAILS:
      const userId = action.payload.phone;

      return {
        ...state,
        users: {...state.users, [userId]: action.payload},
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        users: {...state.users, [userId]: action.payload},
        userLoggedIn: true,
      };
    default:
      return state;
  }
};
