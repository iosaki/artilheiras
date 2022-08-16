const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: test } = require("node:test");
const { send } = require("process");
const { json } = require("stream/consumers");

exports.token = async (req, res) => {
	const refreshToken = req.body.token;
	const refreshTokens = await prisma.tokens.findUnique({
		where: {
			token: req.body.token,
		},
		include: {
			user: true,
		},
	});
	if (!refreshToken) return res.sendStatus(401);
	if (!refreshTokens) return res.sendStatus(403);

	jwt.verify(
		refreshToken,
		process.env.REFRESH_TOKEN_SECRET,
		(err, refreshTokens) => {
			if (err) return res.sendStatus(403);
			const accessToken = generateAccessToken(refreshTokens);
			return res.json({ accessToken: accessToken });
		}
	);
};

exports.login = async (req, res) => {
	try {
		const user = await prisma.users.findUnique({
			where: {
				email: req.body.email,
			},
		});
		console.log(user);
		if (!user) {
			return res.status(400).send("Cannot find user");
		}

		const checkPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!checkPassword) {
			return res.status(400).send("Invalid password");
		}

		const accessToken = await generateAccessToken(user);
		const refreshToken = await generateRefreshToken(user);

		const newRefreshToken = await prisma.tokens.create({
			data: {
				user_id: user.id,
				token: refreshToken,
			},
		});

		return res.json({ accessToken: accessToken, refreshToken: refreshToken });
	} catch (e) {
		console.error(e);
		return sendErrorResponse(
			res,
			500,
			"Server error, contact admin to resolve issue",
			e
		);
	}
};

exports.logout = async (req, res) => {
	const deleteRefreshTokens = await prisma.tokens.delete({
		where: { token: req.body.token },
	});
	res.status(204).send();
};

function generateAccessToken(user) {
	return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "5d",
	});
}

function generateRefreshToken(user) {
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	return refreshToken;
}
