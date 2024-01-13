import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const Login = lazy(() => import("./components/Forms/Login"));
const Register = lazy(() => import("./components/Forms/Register"));
const AccountDashboard = lazy(() =>
  import("./components/Dashboard/AccountDashboard")
);
const AccountDetails = lazy(() =>
  import("./components/Dashboard/AccountDetails")
);
const AddTransaction = lazy(() => import("./components/Forms/AddTransaction"));
const AddAccount = lazy(() => import("./components/Forms/AddAccount"));

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AccountDashboard />} />
          <Route path="/dashboard/accounts/create" element={<AddAccount />} />
          <Route
            path="/account-details/:accountID"
            element={<AccountDetails />}
          />
          <Route path="/add-transaction/:id" element={<AddTransaction />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
