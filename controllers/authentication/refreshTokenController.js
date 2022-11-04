const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.refreshToken = (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) return res.sendStatus(401);

	const refreshToken = cookies.jwt;

	const user = prisma.tokens.findUnique({
		where: {
			token: cookies.jwt,
		},
	});
	if (!user) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
		if (err || user.user_id !== decoded.user_id) return res.sendStatus(403);
		const accessToken = jwt.sign(
			{ userId: decoded.user_id },
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "1d",
			}
		);

		res.json({ accessToken });
	});
};
