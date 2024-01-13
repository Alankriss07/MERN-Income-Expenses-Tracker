// const bcrypt = require("bcryptjs");
// const User = require("../../model/User");
// const { AppErr, appErr } = require("../../utils/appErr");
// const generateToken = require("../../utils/generateToken");

const secureHash = require("bcryptjs");
const MemberEntity = require("../../model/MemberEntity");
const {
  ValidationError,
  validationError,
} = require("../../utils/validationError");
const generateSecureToken = require("../../utils/generateSecureToken");

// Sign-Up
const registerMemberController = async (req, res, next) => {
  const { fullName, secretKey, emailAddress } = req.body;
  try {
    // Check if email is already registered
    const existingMember = await MemberEntity.findOne({ emailAddress });
    if (existingMember) {
      return next(validationError("Member Already Exists", 400));
    }

    // Hash secretKey
    const saltRounds = await secureHash.genSalt(10);
    const hashedSecretKey = await secureHash.hash(secretKey, saltRounds);

    // Create new member entity
    const newMember = await MemberEntity.create({
      fullName,
      emailAddress,
      secretKey: hashedSecretKey,
    });

    res.json({
      status: "success",
      fullName: newMember.fullName,
      emailAddress: newMember.emailAddress,
      id: newMember._id,
    });
  } catch (error) {
    next(new ValidationError(error.message, 500));
  }
};

// Sign-In
const loginMemberController = async (req, res, next) => {
  const { emailAddress, secretKey } = req.body;
  try {
    // Check if email exists
    const foundMember = await MemberEntity.findOne({ emailAddress });
    if (!foundMember)
      return next(new ValidationError("Invalid login credentials", 400));

    // Check for secretKey validity
    const isSecretKeyMatch = await secureHash.compare(
      secretKey,
      foundMember.secretKey
    );
    if (!isSecretKeyMatch)
      return next(new ValidationError("Invalid login credentials", 400));

    res.json({
      status: "success",
      fullName: foundMember.fullName,
      id: foundMember._id,
      token: generateSecureToken(foundMember._id),
    });
  } catch (error) {
    next(new ValidationError(error.message, 500));
  }
};

// Member Profile
const fetchMemberProfileController = async (req, res) => {
  console.log(req.user);
  console.log("err");
  try {
    const memberProfile = await MemberEntity.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(memberProfile);
  } catch (error) {
    console.log(new ValidationError(error.message, 500));
    next(new ValidationError(error.message, 500));
  }
};

// Delete Member
const removeMemberController = async (req, res, next) => {
  try {
    await MemberEntity.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
    res.json({ msg: "delete route" });
  } catch (error) {
    next(new ValidationError(error.message, 500));
  }
};

// Update Member
const modifyMemberController = async (req, res, next) => {
  try {
    // Check if email exists
    if (req.body.emailAddress) {
      const memberExists = await MemberEntity.findOne({
        emailAddress: req.body.emailAddress,
      });
      if (memberExists)
        return next(
          new ValidationError(
            "Email is taken or you already have this email",
            400
          )
        );
    }

    // Check if member is updating the secretKey
    if (req.body.secretKey) {
      const saltRounds = await secureHash.genSalt(10);
      const hashedSecretKey = await secureHash.hash(
        req.body.secretKey,
        saltRounds
      );

      // Update the member
      const updatedMember = await MemberEntity.findByIdAndUpdate(
        req.user,
        {
          secretKey: hashedSecretKey,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      // Send the response
      return res.status(200).json({
        status: "success",
        data: updatedMember,
      });
    }

    const updatedMember = await MemberEntity.findByIdAndUpdate(
      req.user,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // Send the response
    res.status(200).json({
      status: "success",
      data: updatedMember,
    });
  } catch (error) {
    next(new ValidationError(error.message, 500));
  }
};

module.exports = {
  registerMemberController,
  loginMemberController,
  fetchMemberProfileController,
  removeMemberController,
  modifyMemberController,
};
