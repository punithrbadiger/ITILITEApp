import {SIGN_UP_DETAILS, LOGIN_SUCCESS, SIGNOUT_USER} from '../type';

export const signUpDetails = (signUpDetails) => (dispatch) => {
  dispatch({type: SIGN_UP_DETAILS, payload: signUpDetails});
};

export const loginSuccess = (userData) => (dispatch) => {
  dispatch({type: LOGIN_SUCCESS, payload: userData});
};

export const deviceAuthSuccess = (userData) => (dispatch) => {
  dispatch({type: LOGIN_SUCCESS, payload: userData});
};

export const signoutUser = (data) => (dispatch) => {
  dispatch({type: SIGNOUT_USER});
};
