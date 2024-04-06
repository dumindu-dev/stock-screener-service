const mongoose = require("mongoose")

const economicEventSchema = mongoose.Schema({
	date: Date,
	events: {
		type:Map,
		of:{
			title:String,
			indicator:String,
			comment:String,
			importance:Number
		}
	}
});

module.exports = mongoose.model("EconomicEvent", economicEventSchema)