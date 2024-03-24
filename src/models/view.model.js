const mongoose = require("mongoose")

const viewSchema = mongoose.Schema({
	view_id: String,
	owner_id: String,
	view_name: String,
	view_description: String,
	stocks: [String],
	result: [{
        symbol:String,
        company:String,
        price:Number,
        day1change:String,
        day7change:String
    }],
    performance: String,
    lastUpdate: String
});

module.exports = mongoose.model("View", viewSchema)