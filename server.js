const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

const connectionDB = require("./config/db");
const router = require("./routes/user.route");


const PORT = process.env.PORT || 8080;
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.send("Welcome to Full Stack Page");
})

app.use("/users", router);

app.listen(process.env.PORT, async () => {
	try {
		await connectionDB;
		console.log("Database connected successfully");
		console.log(`Server is running on port ${PORT}`);
	} catch (error) { 
		console.log(error);		
	}
})