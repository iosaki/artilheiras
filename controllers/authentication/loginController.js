const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: test } = require("node:test");
const { send } = require("process");
const { json } = require("stream/consumers");

exports.login = async (req, res) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email: req.body.email,
			},
		});
		if (!user) {
			res.status(400).send("Cannot find user");
		}

		const checkPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!checkPassword) {
			res.status(400).send("Credenciais inválidas");
		}

		const accessToken = await generateAccessToken(user);
		const refreshToken = await generateRefreshToken(user);

		const newRefreshToken = await prisma.tokens.create({
			data: {
				user_id: user.id,
				token: refreshToken,
			},
		});

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});

		res.json({ accessToken: accessToken });
	} catch (e) {
		console.error(e);
		// sendErrorResponse(
		// 	res.status(500).send("Server error, contact admin to resolve issue")
		// );
	}
};

function generateAccessToken(user) {
	return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
}

function generateRefreshToken(user) {
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
	return refreshToken;
}
