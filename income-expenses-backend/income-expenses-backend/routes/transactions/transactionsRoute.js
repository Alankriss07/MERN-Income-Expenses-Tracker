const expressHandler = require("express");
const {
  handleNewFinancialEntry,
  fetchAllFinancialEntries,
  getSpecificFinancialEntry,
  deleteFinancialEntry,
  updateFinancialEntry,
} = require("../../controllers/moneyActivities/financialEntryHandler");
const verifyUserAuthentication = require("../../middlewares/verifyUserAuthentication");

const financialEntryRouter = expressHandler.Router();

//POST/api/v1/money-entries
financialEntryRouter.post(
  "/",
  verifyUserAuthentication,
  handleNewFinancialEntry
);

//GET/api/v1/money-entries
financialEntryRouter.get("/", fetchAllFinancialEntries);

//GET/api/v1/money-entries/:id
financialEntryRouter.get("/:id", getSpecificFinancialEntry);

//DELETE/api/v1/money-entries/:id
financialEntryRouter.delete("/:id", deleteFinancialEntry);

//PUT/api/v1/money-entries/:id
financialEntryRouter.put("/:id", updateFinancialEntry);

module.exports = financialEntryRouter;
