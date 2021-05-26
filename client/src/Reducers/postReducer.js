import {
  POST_LOADED_FAIL,
  LOAD_POST_SUCCESS,
  ADD_POST_SUCCCESS,
  DELETE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  FIND_UPDATE,
} from "../Contexts/constant";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POST_SUCCESS:
      // console.log(payload);
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };
    case POST_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };
    case ADD_POST_SUCCCESS:
      return {
        ...state,
        posts: [...state.posts, payload],
        postLoading: false,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    case FIND_UPDATE:
      return {
        ...state,
        post: payload,
      };
    case UPDATE_POST_SUCCESS:
      // console.log(payload);
      const newPosts = state.posts.map((post) => {
        // console.log(payload);
        if (post._id === payload._id) return payload.res;
        return post;
      });
      // console.log(newPosts);
      return {
        ...state,
        posts: newPosts,
      };
    default:
      return state;
  }
};
