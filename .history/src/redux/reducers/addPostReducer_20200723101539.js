import {ADD_POST_DETAILS, PROFILE_PIC} from '../type';

const INITIAL_STATE = {
  posts: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_POST_DETAILS:
      let postId;
      if (Object.keys(state.posts).length === 0) {
        postId = 1;
      } else {
        postId = Math.max(Object.keys(state.posts)) + 1;
      }
      return {
        ...state,
        posts: {
          ...state.posts,
          [postId]: {postId: postId, ...action.payload},
        },
      };
    case PROFILE_PIC:
      return {
        ...state,
        profilePic: action.payload,
      };

    default:
      return state;
  }
};
