import loginService from "../../services/authentication/login";
const jwt = require("jsonwebtoken");

export default function loginController(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	const response = loginService(username, password);
	return res.json(response);
}
