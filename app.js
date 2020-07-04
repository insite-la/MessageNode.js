const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const feedRoutes = require("./routes/feed");

const app = express();

app.use(bodyParser.json()); // application/json
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"OPTIONS, GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({message});
});

app.use("/feed", feedRoutes);

const MONGODB_URI =
	"mongodb+srv://Luis:5WAvUJnyunuOLjvZ@cluster0-vmurt.mongodb.net/messages ";

mongoose
	.connect(MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(4000);
		console.log("connected");
	})
	.catch((err) => console.log(err));
