const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	userId: { type: String, required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	telegramToken: { type: String, required: true },
	telegramChatId:{ type: String, required: false },
	settings:{telegram_dividends:Number}
});

module.exports = mongoose.model("User", userSchema)