const databaseConnector = require("mongoose");

// Define Economic Transaction Blueprint

const economicEventSchema = new databaseConnector.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Income", "Outflow"],
      required: true,
    },

    monetaryValue: {
      type: Number,
      required: true,
    },

    eventCategory: {
      type: String,
      enum: [
        "Culinary",
        "Commute",
        "Recreation",
        "Shopping",
        "Utilities",
        "Healthcare",
        "Journey",
        "Education",
        "Personal",
        "Groceries",
        "Bills",
        "Miscellaneous",
        "Property",
      ],
      required: true,
    },
    markerColor: {
      type: String,
    },
    initiatorID: {
      type: databaseConnector.Schema.Types.ObjectId,
      ref: "SystemUser",
      required: true,
    },
    eventTime: {
      type: Date,
      default: Date.now(),
    },
    additionalDescriptions: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Declaration of Model
const FinancialEvent = databaseConnector.model(
  "FinancialEvent",
  economicEventSchema
);

module.exports = FinancialEvent;
