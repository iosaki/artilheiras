const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.index = async (req, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
	if (users) {
		return users;
	} else {
		return {
			status: 404,
			message: "erro ao listar usuários",
		};
	}
};

exports.create = async (req, res) => {
	const newUser = await prisma.user.create({
		data: {
			full_name: req.body.full_name,
			email: req.body.email,
			password: req.body.password,
		},
	});
	res.status(201).send({ message: "user created successfully" });
};

exports.show = async (req, res) => {
	const user = await prisma.user.findUnique({
		where: {
			id: req.params.id,
		},
	});
	res.json(user);
};

exports.edit = async (req, res) => {
	const user = await prisma.user.update({
		where: { id: req.params.id },
		data: {
			full_name: req.body.full_name,
			email: req.body.email,
			password: req.body.password,
		},
	});
	res.status(201).send({ message: "user updated successfully" });
};
