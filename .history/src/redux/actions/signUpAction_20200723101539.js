import {SIGN_UP_DETAILS, LOGIN_SUCCESS} from '../type';

export const signUpDetails = (signUpDetails) => (dispatch) => {
  dispatch({type: SIGN_UP_DETAILS, payload: signUpDetails});
};

export const loginSuccess = (userData) => (dispatch) => {
  dispatch({type: LOGIN_SUCCESS, payload: userData});
};
