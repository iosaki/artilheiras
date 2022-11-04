const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
require("dotenv").config();

const app = express();

// // Cross Origin Resource Sharing
const corsOptions = require("./config/corsOptions");
// const corsOptions = {
// 	origin: "http://localhost:3000",
// 	credentials: true,
// 	optionSuccessStatus: 200,
// };

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json
app.use(cookieParser());

// middleware for cookies
app.use(express.json());

// public routes
app.use("/", require("./routes/authentication"));
// protected routes
app.use(auth);
app.use("/users", require("./routes/users"));

// app.listen(process.env.PORT || 3001);
app.listen(process.env.PORT || 3001, function () {
	console.log(
		"Express server listening on port %d in %s mode",
		this.address().port,
		app.settings.env
	);
});
