const usersController = require("../controllers/users/usersController");
const express = require("express");

const router = express.Router();

router.get("/", usersController.index);
router.post("/", usersController.create);
router.get("/:id", usersController.show);
router.put("/edit/:id", usersController.edit);

module.exports = router;
