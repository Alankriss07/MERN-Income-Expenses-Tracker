const expressAppHandler = require("express");
const crossOriginMiddleware = require("cors");
const errorHandler = require("./middlewares/errorHandler");
require("./config/dataConnection");
const financialRouter = require("./routes/finance/financialRouter");
const activityRouter = require("./routes/activities/activityRouter");
const membersRouter = require("./routes/members/membersRouter");

const appHandler = expressAppHandler();

//middlewares
appHandler.use(expressAppHandler.json()); //parse incoming data
//Enable CORS
appHandler.use(crossOriginMiddleware());

appHandler.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Welcome to the Financial Tracker API",
    creator: "Somil",
    course: "Web dev",
  });
});

//Users route
appHandler.use("/api/v1/members", membersRouter);
//Financial routes
appHandler.use("/api/v1/finance", financialRouter);

//Activity routes
appHandler.use("/api/v1/activities", activityRouter);

//Error handling
appHandler.use(errorHandler);

//Listen on server
const SERVER_PORT = process.env.SERVER_PORT || 8080;
appHandler.listen(
  SERVER_PORT,
  console.log(`Server is running on port ${SERVER_PORT}`)
);
