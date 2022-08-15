const express = require("express");
const loginController = require("../controllers/authentication/loginController");

const router = express.Router();

router.post("/login", loginController.login);
router.post("/token", loginController.token);
router.delete("/logout", loginController.logout);

module.exports = router;
