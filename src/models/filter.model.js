const mongoose = require("mongoose")

const filterSchema = mongoose.Schema({
	filter_id: String,
	owner_id: String,
	filter_name: String,
	filter_description: String,
	conditions: [{
        name:String,
        condition:String,
        value:Number
    }],
	result: [Object]
});

module.exports = mongoose.model("Filter", filterSchema)