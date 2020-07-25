import {ADD_POST_DETAILS, PROFILE_PIC} from '../type';

const INITIAL_STATE = {
  posts: {},
};

export default (state = INITIAL_STATE, action) => {
  console.log('actionnn', action.payload);
  switch (action.type) {
    case ADD_POST_DETAILS:
      return {
        ...state,
        posts: {...action.payload},
        },
      };

    default:
      return state;
  }
};
