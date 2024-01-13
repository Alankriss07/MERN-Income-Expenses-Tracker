import React, { useContext, useState } from "react";
import { accountContext } from "../context/AccountContext/AccountContext";

const AddAccount = () => {
  const { createAccountAction, error } = useContext(accountContext);
  const [formData, setFormData] = useState({
    name: "",
    accountType: "",
    initialBalance: "",
    notes: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    createAccountAction(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          <FormField
            label="Initial Deposit ($)"
            name="initialBalance"
            type="number"
            value={formData.initialBalance}
            onChange={handleChange}
          />

          <FormField
            label="Account Type"
            name="accountType"
            type="select"
            value={formData.accountType}
            onChange={handleChange}
            options={[
              "Savings",
              "Investment",
              "Checking",
              "Credit Card",
              "Utilities",
              "Building",
              "Travel",
              "Education",
              "Personal",
              "Groceries",
              "Entertainment",
              "Project",
              "Uncategorized",
            ]}
          />

          <FormField
            label="Add Note"
            name="notes"
            type="textarea"
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add New Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable form field component
const FormField = ({ label, name, type, value, onChange, options }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full border-2 rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          rows={4}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          className="block w-full border-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      ) : (
        <input
          value={value}
          onChange={onChange}
          name={name}
          type={type}
          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        />
      )}
    </div>
  );
};

export default AddAccount;
