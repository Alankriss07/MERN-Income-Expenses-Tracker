const dbConnectionHandler = require("mongoose");

// Define Personal Portfolio Schema

const wealthManagementSchema = new dbConnectionHandler.Schema(
  {
    portfolioTitle: {
      type: String,
      required: true,
    },
    portfolioType: {
      type: String,
      enum: [
        "Savings",
        "Investment",
        "Checking",
        "Credit Card",
        "Property",
        "Education",
        "Venture",
        "Utilities",
        "Travel",
        "Personal",
        "Groceries",
        "Entertainment",
        "Loan",
        "Cash Flow",
        "Uncategorized",
        "Education",
      ],
      required: true,
    },

    initialFunds: {
      type: Number,
      default: 0,
    },

    associatedTransactions: [
      {
        type: dbConnectionHandler.Schema.Types.ObjectId,
        ref: "FinancialTransaction",
      },
    ],
    creatorID: {
      type: dbConnectionHandler.Schema.Types.ObjectId,
      ref: "SystemUser",
    },
    additionalRemarks: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Model Declaration
const Portfolio = dbConnectionHandler.model(
  "Portfolio",
  wealthManagementSchema
);

module.exports = Portfolio;
