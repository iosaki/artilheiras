const usersController = require("../controllers/users/usersController");
const express = require("express");
const router = express.Router();

router.get("/users", usersController.index);
router.post("/users", usersController.create);
router.get("/users/:id", usersController.show);
router.put("/users/edit/:id", usersController.edit);

module.exports = router;
