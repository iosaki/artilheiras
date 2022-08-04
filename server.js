const express = require("express");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const app = express();

// // MIDDLEWARE
// const cors = require("cors");
// app.use((req, res, next) => {
// 	// console.log("acessou o middleware");
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "*");
// 	app.use(cors());
// 	next();
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// rotas
app.use("/", require("./routes/index"));
app.use("/", require("./routes/users"));

app.listen(process.env.PORT || 3001);
