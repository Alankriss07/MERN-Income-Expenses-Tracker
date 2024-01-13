import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./authActionTypes";
import { API_URL_USER } from "../../../utils/apiURL";

export const AuthContext = createContext();

const initialState = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  error: null,
  loading: false,
  profile: null,
};

const authReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    case LOGOUT:
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const makeRequest = async (url, method, data = null) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (state.userAuth) {
      config.headers.Authorization = `Bearer ${state.userAuth.token}`;
    }

    try {
      const res = await axios[method](url, data, config);

      if (res?.data?.status === "success") {
        const actionType =
          typeMapping[method.toUpperCase()]?.[res.data?.action] || "UNKNOWN";
        dispatch({
          type: actionType,
          payload: res.data,
        });
      }

      handleRedirect(method, res);

      if (method === "get" && res?.data) {
        dispatch({
          type: typeMapping[method.toUpperCase()].SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      const actionType =
        typeMapping[method.toUpperCase()]?.[error?.response?.data?.action] ||
        "UNKNOWN";
      dispatch({
        type: actionType,
        payload: error?.response?.data?.message,
      });
    }
  };

  const handleRedirect = (method, res) => {
    if (method === "post" && res?.data?.status === "success") {
      window.location.href = "/login";
    }
  };

  const loginUserAction = async (formData) => {
    await makeRequest(`${API_URL_USER}/login`, "post", formData);
  };

  const registerUserAction = async (formData) => {
    await makeRequest(`${API_URL_USER}/register`, "post", formData);
  };

  const fetchProfileAction = async () => {
    await makeRequest(`${API_URL_USER}/profile`, "get");
  };

  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        loginUserAction,
        userAuth: state,
        token: state?.userAuth?.token,
        fetchProfileAction,
        profile: state?.profile,
        error: state?.error,
        logoutUserAction,
        registerUserAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const typeMapping = {
  POST: {
    success: REGISTER_SUCCESS,
    fail: REGISTER_FAIL,
  },
  GET: {
    success: FETCH_PROFILE_SUCCESS,
    fail: FETCH_PROFILE_FAIL,
  },
};

export default AuthContextProvider;
