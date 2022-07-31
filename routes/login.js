const loginController = require("../controllers/authentication/loginController");
const express = require("express");
const router = express.Router();

router.post("/login", loginController);

module.exports = router;
