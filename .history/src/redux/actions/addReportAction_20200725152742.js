import {ADD_REPORT_DETAILS} from '../type';

export const addReportDetails = (addReportDetails) => (dispatch) => {
  console.log('addReportDetails', addReportDetails);
  dispatch({type: ADD_REPORT_DETAILS, payload: addReportDetails});
};

export const getSavedSearches = (data) => (dispatch) => {
  dispatch({type: SET_LOADING_TRUE});
  const {token} = store.getState().auth;
  axios
    .get(`${baseUrl}/listing/savedsearches?user_type=${data}`, {
      headers: {Authorization: `Bearer ${token}`},
    })
    .then((res) => {
      dispatch({type: SET_LOADING_FALSE});
      dispatch({
        type: GET_SAVED_SEARCHES,
        payload: res.data.data.savedsearches,
      });
    })
    .catch((err) => errorHelper(err, dispatch));
};
