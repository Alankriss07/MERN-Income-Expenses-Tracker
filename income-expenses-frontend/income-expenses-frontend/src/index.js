import React, { lazy, Suspense } from "react";
import { hydrate } from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const AsyncApp = lazy(() => import("./App"));
const AsyncAuthContextProvider = lazy(() =>
  import("./components/context/AuthContext/AuthContext")
);
const AsyncAccountContextProvider = lazy(() =>
  import("./components/context/AccountContext/AccountContext")
);
const AsyncTransactionContextProvider = lazy(() =>
  import("./components/context/TransactionContext/TransactionsContext")
);

const rootElement = document.getElementById("root");

const renderApp = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AsyncAuthContextProvider>
      <AsyncAccountContextProvider>
        <AsyncTransactionContextProvider>
          <AsyncApp />
        </AsyncTransactionContextProvider>
      </AsyncAccountContextProvider>
    </AsyncAuthContextProvider>
  </Suspense>
);

const root = hydrate(renderApp(), rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default root;
