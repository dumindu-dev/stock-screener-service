const mongoose = require("mongoose")

const viewSchema = mongoose.Schema({
	view_id: String,
	owner_id: String,
	view_name: String,
	view_description: String,
	stocks: [String],
	result: [{
        symbol:String,
        longName:String,
        currentPrice:Number,
        previousClose:Number,
        change:Number,
        "52WeekChange":Number
    }],
    performance: String
});

module.exports = mongoose.model("View", viewSchema)