const expressApp = require("express");

const {
  initiateUserRegistration,
  controlUserLogin,
  manageUserProfileAccess,
  eliminateUserAccount,
  adaptUserProfile,
} = require("../../controllers/people/personManagement");
const verifyUserAuthentication = require("../../middlewares/verifyUserAuthentication");

const peopleManagementRouter = expressApp.Router();

//POST/api/v1/people/enroll
peopleManagementRouter.post("/enroll", initiateUserRegistration);

//POST/api/v1/people/access
peopleManagementRouter.post("/access", controlUserLogin);

//GET/api/v1/people/info
peopleManagementRouter.get(
  "/info/",
  verifyUserAuthentication,
  manageUserProfileAccess
);

//DELETE/api/v1/people/account
peopleManagementRouter.delete(
  "/account/",
  verifyUserAuthentication,
  eliminateUserAccount
);

//PUT/api/v1/people/update
peopleManagementRouter.put(
  "/update/",
  verifyUserAuthentication,
  adaptUserProfile
);

module.exports = peopleManagementRouter;
