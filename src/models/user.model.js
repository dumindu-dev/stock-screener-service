const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	telegramChatId:{ type: String, required: false }
});

module.exports = mongoose.model("User", userSchema)