const mongoose = require("mongoose")

const viewSchema = mongoose.Schema({
	view_id: Number,
	owner_id: String,
	stocks: [String],
	result: [{
        symbol:String,
        company:String,
        price:Number,
        day1change:String,
        day7change:String
    }]
});

module.exports = mongoose.model("View", viewSchema)