const mongoose = require("mongoose")

const siteSchema = mongoose.Schema({
	siteName: { type: String, required: false },
	lastPriceUpdate: { type: String, required: false }
});

module.exports = mongoose.model("Site", siteSchema)