import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import {
  TRANSACTION_CREATION_STARTED,
  TRANSACTION_CREATION_SUCCESS,
  TRANSACTION_CREATION_FAIL,
} from "./transactionsActionTypes";
import { API_URL_TRANSACTION } from "../../../utils/apiURL";

export const TransactionContext = createContext();

const initialState = {
  transaction: null,
  transactions: [],
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("userAuth")),
};

const transactionReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case TRANSACTION_CREATION_SUCCESS:
      return {
        ...state,
        loading: false,
        transaction: payload,
      };
    case TRANSACTION_CREATION_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const TransactionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const createTransaction = async (transactionData) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.token?.token}`,
        },
      };

      const response = await axios.post(
        API_URL_TRANSACTION,
        transactionData,
        config
      );

      if (response?.data?.status === "success") {
        dispatch({
          type: TRANSACTION_CREATION_SUCCESS,
          payload: response?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TRANSACTION_CREATION_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transaction: state.transaction,
        transactions: state.transactions,
        createTransaction,
        error: state?.error,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionContextProvider;
