import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { transactionContext } from "../context/TransactionContext/TransactionsContext";

const formFields = [
  { label: "Name", name: "name", type: "text" },
  {
    label: "Transaction Type",
    name: "transactionType",
    type: "select",
    options: ["Income", "Expense"],
  },
  { label: "Amount ($)", name: "amount", type: "number" },
  { label: "Category", name: "category", type: "text" },
  { label: "Notes", name: "notes", type: "textarea" },
];

const AddTransaction = () => {
  const { id } = useParams();
  const { createTransactionAction } = useContext(transactionContext);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTransactionAction({ account: id, ...formData });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add Transaction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {formFields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select {field.label}
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  rows={4}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="block w-full border-2 rounded-md border-gray-300 py-2 px-3 focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
