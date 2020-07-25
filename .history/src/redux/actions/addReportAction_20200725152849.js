import {ADD_REPORT_DETAILS} from '../type';

export const addReportDetails = (addReportDetails) => (dispatch) => {
  console.log('addReportDetails', addReportDetails);
  dispatch({type: ADD_REPORT_DETAILS, payload: addReportDetails});
};

export const getSavedSearches = (data) => (dispatch) => {
  dispatch({type: SET_LOADING_TRUE});
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=' +
    this.state.currentLatitude +
    '&lon=' +
    this.state.currentLongitude +
    '&units=metric&appid=3e8628659484d984269e1ff36d017820`,
    )
    .then((res) => {
      dispatch({type: SET_LOADING_FALSE});
      dispatch({
        type: GET_SAVED_SEARCHES,
        payload: res.data.data.savedsearches,
      });
    })
    .catch((err) => errorHelper(err, dispatch));
};
