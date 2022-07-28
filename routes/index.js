const express = require("express");
const router = express.Router();

router.get("/api", (req, res) => {
	res.json({ users: ["Isabela", "Norberto", "Gustavo", "Bárbara"] });
});

module.exports = router;
