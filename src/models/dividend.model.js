const mongoose = require("mongoose")

const dividendSchema = mongoose.Schema({
	date: Number,
	dividends: {
		type:Map,
		of:{
			company:String,
			amount:Number,
			yield:Number,
			currentPrice:Number
		}
	}
});

module.exports = mongoose.model("Dividend", dividendSchema)