import {ADD_REPORT_DETAILS} from '../type';

const INITIAL_STATE = {
  reports: {},
};

export default (state = INITIAL_STATE, action) => {
  console.log('actionnn', action.payload);
  switch (action.type) {
    case ADD_REPORT_DETAILS:
      return {
        ...state,
        reports: {...state.posts, ...action.payload},
      };

    default:
      return state;
  }
};
