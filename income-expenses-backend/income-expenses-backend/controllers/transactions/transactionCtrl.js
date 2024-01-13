const LedgerEntry = require("../../model/LedgerEntry");
const FinancialTransaction = require("../../model/FinancialTransaction");
const AppUser = require("../../model/AppUser");
const { CustomError } = require("../../utils/customError");

// Record a new financial transaction
const recordLedgerEntryController = async (req, res, next) => {
  const {
    entryTitle,
    amount,
    description,
    transactionType,
    account,
    expenseCategory,
  } = req.body;
  try {
    // 1. Find the app user
    const currentUser = await AppUser.findById(req.user);
    if (!currentUser) return next(new CustomError("User not found", 404));

    // 2. Locate the associated financial account
    const financialAccount = await LedgerEntry.findById(account);
    if (!financialAccount)
      return next(new CustomError("Account not found", 404));

    // 3. Create the ledger entry
    const ledgerEntry = await FinancialTransaction.create({
      amount,
      description,
      account,
      transactionType,
      category: expenseCategory,
      title: entryTitle,
      createdBy: req.user,
    });

    // 4. Add the ledger entry to the financial account
    financialAccount.transactions.push(ledgerEntry._id);

    // 5. Save the updated financial account
    await financialAccount.save();

    res.json({ status: "success", data: ledgerEntry });
  } catch (error) {
    res.json(error);
  }
};

// Retrieve all financial transactions
const getAllLedgerEntriesController = async (req, res, next) => {
  try {
    const ledgerEntries = await FinancialTransaction.find();
    res.status(200).json({
      status: "success",
      data: ledgerEntries,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Retrieve a single financial transaction
const getLedgerEntryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ledgerEntry = await FinancialTransaction.findById(id);
    res.json({ status: "success", data: ledgerEntry });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Remove a financial transaction
const deleteLedgerEntryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await FinancialTransaction.findByIdAndDelete(id);
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Update a financial transaction
const updateLedgerEntryController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedLedgerEntry = await FinancialTransaction.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "success",
      data: updatedLedgerEntry,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  recordLedgerEntryController,
  getAllLedgerEntriesController,
  getLedgerEntryController,
  deleteLedgerEntryController,
  updateLedgerEntryController,
};
