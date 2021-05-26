import { createContext, useReducer, useState } from "react";
import { postReducer } from "../Reducers/postReducer";
import {
  apiUrl,
  POST_LOADED_FAIL,
  ADD_POST_SUCCCESS,
  LOAD_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  FIND_UPDATE,
} from "./constant";
import axios from "axios";
import restResponse from "../common/response";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispatch] = useReducer(postReducer, {
    post: null,
    posts: [],
    postLoading: true,
  });

  //Get all post
  const getAllPost = async () => {
    try {
      const getAllPostResponse = await axios.get(`${apiUrl}/posts`);
      if (getAllPostResponse.data.success) {
        dispatch({
          type: LOAD_POST_SUCCESS,
          payload: getAllPostResponse.data.data,
        });
        //   console.log(getAllPostResponse.data.data);
        return restResponse(
          true,
          "get post success",
          getAllPostResponse.data.data
        );
      } else return restResponse(false, getAllPostResponse.data);
    } catch (error) {
      dispatch({
        type: POST_LOADED_FAIL,
      });
    }
  };

  //Post a post
  const addPost = async (post) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, post);
      if (response.data.success) {
        dispatch({
          type: ADD_POST_SUCCCESS,
          payload: response.data.data,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  //Delete a post
  const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${id}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_POST_SUCCESS,
          payload: id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get post id
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId);
    dispatch({ type: FIND_UPDATE, payload: post });
  };

  //Update post
  const updatePost = async (update) => {
    try {
      const response = await axios.put(`${apiUrl}/posts/${update._id}`, update);
      if (response.data.success) {
        // console.log(response.data.data);
        dispatch({ type: UPDATE_POST_SUCCESS, payload: { res: response.data.data, _id: update._id} });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showAddPostModal, setShowAddPostModal] = useState(false);
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  const postContextData = {
    postState,
    getAllPost,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    updatePost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  };

  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
