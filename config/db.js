const { default: mongoose } = require("mongoose");

const connectionDB = mongoose.connect(process.env.MONGO_URL);

module.exports = connectionDB
