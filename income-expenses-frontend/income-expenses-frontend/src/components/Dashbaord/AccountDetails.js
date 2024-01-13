import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/20/solid";
import { accountContext } from "../context/AccountContext/AccountContext";
import AllTransactions from "./AllTransactions";

const AccountDetails = () => {
  const { getAccountDetailsAction, account } = useContext(accountContext);
  const { accountID } = useParams();

  useEffect(() => {
    getAccountDetailsAction(accountID);
  }, [accountID]);

  const calculateTotal = (transactionType) =>
    account?.transactions
      ?.filter(
        (transaction) => transaction?.transactionType === transactionType
      )
      ?.reduce((acc, transaction) => acc + transaction?.amount, 0) || 0;

  const totalIncome = calculateTotal("Income");
  const totalExpenses = calculateTotal("Expenses");

  const renderNoTransactions = () => (
    <div className="no-transactions">
      <h2 className="text-center text-red-500 m-10">
        This account doesn't have any transactions
      </h2>
      <div className="text-center">
        <Link to={`/add-transaction/${accountID}`} className="cta-button">
          <PlusIcon className="icon" aria-hidden="true" />
          <span>New Transaction</span>
        </Link>
      </div>
    </div>
  );

  const renderAccountDetails = () => (
    <div className="account-details">
      <div className="info-section">
        <h2 className="title">{account?.name}</h2>
        <p className="description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus
          repellat laudantium.
        </p>
      </div>
      <div className="balance-section">
        <div className="balance-info">
          <p className="label">Total Balance</p>
          <p className="amount">
            $ {totalIncome + account?.initialBalance - totalExpenses}
          </p>
        </div>
        <div className="expenses-info">
          <p className="label">Total Expenses</p>
          <p className="amount"> $ {totalExpenses}</p>
          <Link to={`/expenses-list/${3}`} className="history-link">
            View History
          </Link>
        </div>
        <div className="income-info">
          <p className="label">Total Income</p>
          <p className="amount">$ {totalIncome + account?.initialBalance}</p>
          <Link to={`/income-list/`} className="history-link">
            View History
          </Link>
        </div>
      </div>
      <AllTransactions
        transactions={account?.transactions}
        accountID={accountID}
      />
    </div>
  );

  return (
    <>
      {account?.transactions?.length <= 0
        ? renderNoTransactions()
        : renderAccountDetails()}
    </>
  );
};

export default AccountDetails;
