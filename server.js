const express = require("express");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const app = express();

// MIDDLEWARE
const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// rotas
app.use("/", require("./routes/users"));
app.use("/", require("./routes/authentication"));

// app.listen(process.env.PORT || 3001);

app.listen(process.env.PORT || 3001, function () {
	console.log(
		"Express server listening on port %d in %s mode",
		this.address().port,
		app.settings.env
	);
});
