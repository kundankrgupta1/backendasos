const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if(token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			req.body.userID = decoded.userID;
			req.body.name = decoded.name;
			next();
		});
	} else {
		res.status(401).json({
			message: "token not found, Please login first"
		});
	}
}

module.exports = auth;