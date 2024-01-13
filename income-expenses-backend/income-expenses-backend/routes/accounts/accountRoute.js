const expressApp = require("express");
const {
  addNewPortfolio,
  erasePortfolio,
  retrievePortfolioData,
  modifyPortfolioData,
  getAllPortfoliosData,
} = require("../../controllers/portfolio/portfolioManagement");
const authenticateUser = require("../../middlewares/authenticateUser");

const portfolioRouterHandler = expressApp.Router();

//POST/api/v1/portfolios
portfolioRouterHandler.post("/", authenticateUser, addNewPortfolio);

//GET/api/v1/portfolios/:id
portfolioRouterHandler.get("/:id", retrievePortfolioData);

//DELETE/api/v1/portfolios/:id
portfolioRouterHandler.delete("/:id", erasePortfolio);

//PUT/api/v1/portfolios/:id
portfolioRouterHandler.put("/:id", modifyPortfolioData);

//GET/api/v1/portfolios
portfolioRouterHandler.get("/", getAllPortfoliosData);

module.exports = portfolioRouterHandler;
