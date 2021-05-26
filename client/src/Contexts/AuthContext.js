import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../Reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constant";
import restResponse from "../common/response";
import axios from "axios";
import setAuthToken from "../ultis/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      // console.log(response);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.data,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => loadUser(), []);

  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data);
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      return restResponse(false, error);
    }
  };
  //register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.data);
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      return restResponse(false, error);
    }
  };
  //logout
  const logoutUser = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Context data
  const authContextData = { logoutUser, loginUser, authState, registerUser };

  //Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
