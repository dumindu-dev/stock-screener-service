const EconomicEvent = require("../models/economicEvent.model")

exports.getMarketEvents = async (req, res) => {
	const today = new Date();
	const ecoEvents = await EconomicEvent.find({date: {$gt: today}}, "-_id date events");
	res.send(ecoEvents);
};