import {ADD_POST_DETAILS} from '../type';

export const addReportDetails = (addReportDetails) => (dispatch) => {
  console.log('addReportDetails', addReportDetails);
  dispatch({type: ADD_POST_DETAILS, payload: addReportDetails});
};
