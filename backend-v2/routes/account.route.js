import express from "express";
import { AccountController } from "../controllers/index.js";
import uploadSingle from "../middlewares/uploadSingle.js";

const AccountRoutes = express.Router();

AccountRoutes.post("/", uploadSingle('avatar'),AccountController.createAccount);
AccountRoutes.get("/", AccountController.getAccountsInPage);
AccountRoutes.get("/:accountId", AccountController.getAccountById);
AccountRoutes.put("/:accountId", uploadSingle('avatar'),  AccountController.updateAccountById);
AccountRoutes.patch("/:accountId", AccountController.changeAccountStatus);

export default AccountRoutes;
