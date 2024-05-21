const express = require("express");
const productModel = require("../model/product.model");

const routerProduct = express.Router();

routerProduct.get("/", async (req, res) => {
	try {
		const product = await productModel.find();
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong while fetching the products",
			error: error
		})
	}
})

routerProduct.post("/addproduct", async (req, res) => {
	const { title, price, color, image, description, category } = req.body;

	try {
		const product = await productModel.create({
			title, price, color, image, description, category
		})
		await product.save()
		res.status(201).json({
			message: "Product added successfully",
		})
	} catch (error) {
		res.status(500).json({
			message: "Error while adding the product",
			error: error
		})
	}
})

module.exports = routerProduct