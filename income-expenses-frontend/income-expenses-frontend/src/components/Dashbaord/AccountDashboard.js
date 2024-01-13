import React, { useContext, useEffect } from "react";
import { authContext } from "../context/AuthContext/AuthContext";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";

const AccountDashboard = () => {
  const { fetchProfileAction, profile, error } = useContext(authContext);

  useEffect(() => {
    // Fetch profile data on component mount
    fetchProfileAction();
  }, []);

  const renderErrorAlert = () => (
    <div className="error-alert">
      <strong>Error!</strong> <span>{error}</span>
    </div>
  );

  const renderAccountContent = () => (
    <>
      <AccountSummary />
      <AccountList accounts={profile?.accounts} />
    </>
  );

  return (
    <div className="account-dashboard">
      {error ? renderErrorAlert() : renderAccountContent()}
    </div>
  );
};

export default AccountDashboard;
