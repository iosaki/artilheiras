const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.logout = async (req, res) => {
	// check if client has cookies
	const cookies = req.cookies;

	if (!cookies?.jwt) return res.sendStatus(204);

	const refreshToken = cookies.jwt;

	// check if refreshToken is in the db
	const findUser = await prisma.tokens.findUnique({
		where: {
			token: refreshToken,
		},
	});

	if (!findUser) {
		// res.clearCookie("jwt", { httpOnly: true });
		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "None",
			secure: true,
			maxAge: 24 * 60 * 60 * 1000,
		});
		return res.sendStatus(204);
	}

	// delete token in the db
	const deleteRefreshTokens = await prisma.tokens.delete({
		where: { token: refreshToken },
	});

	// res.clearCookie("jwt", { httpOnly: true });
	res.clearCookie("jwt", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
		maxAge: 24 * 60 * 60 * 1000,
	});
	res.sendStatus(204);
};
