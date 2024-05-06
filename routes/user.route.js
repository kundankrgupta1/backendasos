const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const user = await userModel.find();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong while fetching the users", error
		})
	}
})

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body
	try {
		bcrypt.hash(password, 5, async (err, hash) => {
			if (err) {
				res.status(500).json({
					message: "Something went wrong while hasing the password"
				})
			}
			const user = new userModel({ name, email, password: hash });
			await user.save();
			res.status(201).json({
				message: "user registered successfully"
			});
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong while registering  the user", error
		})
	}
})

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (user) {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					const token = jwt.sign({ userID: user._id, name: user.name }, process.env.JWT_SECRET);
					res.status(200).json({
						message: "Login Successfull", token: token, name: user.name
					})
				} else {
					res.status(401).json({
						message: "Invalid Credentails"
					})
				}
			})
		} else {
			res.status(401).json({
				message: "User not found, register first!"
			})
		}
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong while login the user", error
		})
	}
})


module.exports = router
