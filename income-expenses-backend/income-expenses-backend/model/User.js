const dataConnector = require("mongoose");

// Define Identity Schema

const identitySchema = new dataConnector.Schema(
  {
    personName: {
      type: String,
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    secretPasscode: {
      type: String,
      required: true,
    },
    hasProfileEstablished: {
      type: Boolean,
      default: false,
    },
    financialProfiles: [
      {
        type: dataConnector.Schema.Types.ObjectId,
        ref: "FinancialProfileRecord",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Create Model
const IdentityRecord = dataConnector.model("IdentityRecord", identitySchema);

module.exports = IdentityRecord;
