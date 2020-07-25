import {ADD_REPORT_DETAILS, PROFILE_PIC} from '../type';

const INITIAL_STATE = {
  reports: {},
};

export default (state = INITIAL_STATE, action) => {
  console.log('actionnn', action.payload);
  switch (action.type) {
    case ADD_REPORT_DETAILS:
      return {
        ...state,
        reports: {...action.payload},
      };

    default:
      return state;
  }
};
