import {ADD_POST_DETAILS, PROFILE_PIC} from '../type';

export const addPostDetails = (addPostDetails) => (dispatch) => {
  dispatch({type: ADD_POST_DETAILS, payload: addPostDetails});
};

export const updateProfilePicture = (profilePic) => (dispatch, getState) => {
  console.log('called in redux profile pic', profilePic);
  dispatch({
    type: PROFILE_PIC,
    payload: {profilePic},
  });
};
