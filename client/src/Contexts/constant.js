export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "somedeployUrl";

export const LOCAL_STORAGE_TOKEN_NAME = "learnit-mern";

export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const POST_LOADED_FAIL = "POST_LOADED_FAIL";
export const ADD_POST_SUCCCESS = "ADD_POST_SUCCESS";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const FIND_UPDATE = "FIND_UPDATE";