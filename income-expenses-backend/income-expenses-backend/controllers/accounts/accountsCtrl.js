const Wallet = require("../../model/Wallet");
const UserEntity = require("../../model/UserEntity");
const { CustomError } = require("../../utils/customError");

// New account creation
const createWalletController = async (req, res, next) => {
  const { name, initialAmount, walletType, description } = req.body;
  try {
    // Fetch the logged-in user
    const existingUser = await UserEntity.findById(req.user);
    if (!existingUser) return next(new CustomError("User not found", 404));

    // Create a new wallet
    const wallet = await Wallet.create({
      name,
      balance: initialAmount,
      type: walletType,
      notes: description,
      owner: req.user,
    });

    // Add the wallet to the user's wallets
    existingUser.wallets.push(wallet._id);

    // Save the updated user
    await existingUser.save();

    res.json({
      status: "success",
      data: wallet,
    });
  } catch (error) {
    next(error);
  }
};

// Retrieve all wallets
const getAllWalletsController = async (req, res) => {
  try {
    const wallets = await Wallet.find().populate("transactions");
    res.json(wallets);
  } catch (error) {
    res.json(error);
  }
};

// Retrieve a single wallet
const getWalletController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findById(id).populate("transactions");
    res.json({
      status: "success",
      data: wallet,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Delete a wallet
const deleteWalletController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Wallet.findByIdAndDelete(id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// Update a wallet
const updateWalletController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWallet = await Wallet.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({
      status: "success",
      data: updatedWallet,
    });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

module.exports = {
  createWalletController,
  getWalletController,
  deleteWalletController,
  updateWalletController,
  getAllWalletsController,
};
