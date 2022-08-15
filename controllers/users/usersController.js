const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

exports.index = async (req, res) => {
	const users = await prisma.users.findMany();
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
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = await prisma.users.create({
			data: {
				full_name: req.body.full_name,
				email: req.body.email,
				password: hashedPassword,
			},
		});
		console.log(newUser);

		res.status(201).send({ message: "user created successfully" });
	} catch {
		res.status(500).send();
	}
};

exports.show = async (req, res) => {
	const user = await prisma.users.findUnique({
		where: {
			id: req.params.id,
		},
	});
	console.log(user);
	res.json(user);
};

exports.edit = async (req, res) => {
	const user = await prisma.users.update({
		where: { id: req.params.id },
		data: {
			full_name: req.body.full_name,
			email: req.body.email,
			password: req.body.password,
		},
	});
	res.status(201).send({ message: "user updated successfully" });
};
