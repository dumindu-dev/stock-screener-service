const Stock = require("../models/stock.model")

exports.searchByCompanyName = async (req, res) => {
	const stocks = await Stock.find({longName: {$regex: new RegExp(req.body.searchQuery, "i")}}, "-_id longName currentPrice symbol").limit(5);
	res.send(stocks);
};