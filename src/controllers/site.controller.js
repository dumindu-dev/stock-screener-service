const Site = require("../models/site.model");
const Stats = require("../utils/Stats");

exports.getLastPriceUpdateTime = async (req, res) => {
	const currentSite = await Site.findOne({siteName:"default-site"}, "-_id lastPriceUpdate");
	res.send(currentSite);
};

exports.getActiveUserCount = async (req, res) => {
	Stats.getActiveUserCount().then(response=>{
		res.send(response);
	}).catch(err=>{
		res.send("N/A");
	});
};