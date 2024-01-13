import React from "react";
import { Link } from "react-router-dom";

const TransactionRow = ({ transaction }) => (
  <tr className={transaction?.color}>
    <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
      <div className="flex items-center">
        <div className="ml-4">
          <div className="font-medium text-gray-900">{transaction?.name}</div>
        </div>
      </div>
    </td>
    <td className="px-3 py-4 text-sm text-gray-500">
      <div className="text-gray-900">{transaction?.transactionType}</div>
    </td>
    <td className="px-3 py-4 text-sm text-gray-500">
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        $ {transaction?.amount}
      </span>
    </td>
    <td className="px-3 py-4 text-sm text-gray-500">{transaction?.notes}</td>
    <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
      <a href="#" className="text-indigo-600 hover:text-indigo-900">
        Edit
        <span className="sr-only">{`, ${transaction?.name}`}</span>
      </a>
    </td>
  </tr>
);

const AllTransactions = ({ transactions, accountID }) => (
  <div className="px-4 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Transaction History
        </h1>
        <p className="text-gray-600 mb-4">
          View all transactions, including expenses and income for this account.
        </p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-2 sm:flex-none">
        <Link
          to={`/add-transaction/${accountID}/`}
          className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Transaction
        </Link>
      </div>
    </div>
    <div className="mt-8">
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Name
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Type
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Amount
              </th>
              <th className="px-3 py-3 text-left text-sm font-semibold text-gray-900">
                Note
              </th>
              <th className="py-3 pl-3 pr-4 sm:pr-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions?.map((transaction) => (
              <TransactionRow
                key={transaction?.email}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AllTransactions;
