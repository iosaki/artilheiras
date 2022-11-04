const express = require("express");
const loginController = require("../controllers/authentication/loginController");
const logoutController = require("../controllers/authentication/logoutController");
const refreshTokenController = require("../controllers/authentication/refreshTokenController");

const router = express.Router();

router.post("/login", loginController.login);
router.get("/refreshtoken", refreshTokenController.refreshToken);
router.get("/logout", logoutController.logout);

module.exports = router;
