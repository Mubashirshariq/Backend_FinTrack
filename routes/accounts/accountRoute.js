const express = require("express");
const {
  createAccountCtrl,
  deleteAccountCtrl,
  getAccountCtrl,
  updateAccountCtrl,
  getAccountsCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountRoute = express.Router();

//POST/api/v1/accounts
accountRoute.post("/",isLogin, createAccountCtrl);

//GET/api/v1/accounts/:id
accountRoute.get("/:id", getAccountCtrl);

//DELETE/api/v1/accounts/:id
accountRoute.delete("/:id", deleteAccountCtrl);

//PUT/api/v1/accounts/:id
accountRoute.put("/:id", updateAccountCtrl);

//GET/api/v1/accounts
accountRoute.get("/", getAccountsCtrl);

module.exports = accountRoute;
