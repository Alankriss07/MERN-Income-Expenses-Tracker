import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { API_URL_ACC } from "../../../utils/apiURL";
import {
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
  ACCOUNT_CREATION_SUCCESS,
  ACCOUNT_CREATION_FAIL,
} from "./accountActionTypes";

// Renamed context and provider for consistency
export const AccountContext = createContext();

// Initial state without userAuth retrieval from localStorage
const initialState = {
  userAuth: null,
  account: null,
  loading: false,
  error: null,
};

// Unified success and fail action types
const actionTypes = {
  GET_DETAILS: {
    SUCCESS: ACCOUNT_DETAILS_SUCCESS,
    FAIL: ACCOUNT_DETAILS_FAIL,
  },
  CREATE_ACCOUNT: {
    SUCCESS: ACCOUNT_CREATION_SUCCESS,
    FAIL: ACCOUNT_CREATION_FAIL,
  },
};

const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_DETAILS.SUCCESS:
    case actionTypes.CREATE_ACCOUNT.SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case actionTypes.GET_DETAILS.FAIL:
    case actionTypes.CREATE_ACCOUNT.FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  // Use effect for logging state changes
  useEffect(() => {
    console.log(state);
  }, [state]);

  // Unified function for making requests
  const makeRequest = async (url, method, data = null) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userAuth?.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios[method](url, data, config);

      if (res?.data?.status === "success") {
        const successType = actionTypes[method.toUpperCase()].SUCCESS;
        dispatch({
          type: successType,
          payload: res?.data?.data,
        });
      }
    } catch (error) {
      const failType = actionTypes[method.toUpperCase()].FAIL;
      dispatch({
        type: failType,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Actions with unified request function
  const getAccountDetailsAction = async (id) => {
    await makeRequest(`${API_URL_ACC}/${id}`, "get");
  };

  const createAccountAction = async (formData) => {
    await makeRequest(API_URL_ACC, "post", formData);
  };

  return (
    <AccountContext.Provider
      value={{
        getAccountDetailsAction,
        createAccountAction,
        account: state?.account,
        error: state?.error,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
