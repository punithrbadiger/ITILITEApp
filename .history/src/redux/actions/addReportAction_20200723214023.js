import {ADD_REPORT_DETAILS} from '../type';

export const addReportDetails = (addReportDetails) => (dispatch) => {
  console.log('addReportDetails', addReportDetails);
  dispatch({type: ADD_REPORT_DETAILS, payload: addReportDetails});
};
