const Site = require("../models/site.model");
const Stats = require("../utils/Stats");

exports.getLastPriceUpdateTime = async (req, res) => {
	const currentSite = await Site.findOne({siteName:"default-site"}, "-_id lastPriceUpdate");
	res.send(currentSite);
};

exports.getActiveUserCount = async (req, res) => {
	Stats.getActiveUserCount().then(response=>{
		try{
			res.send(response.data.description);
		}catch(errr){
			res.send("N/A");
		}
	}).catch(err=>{
		console.log(err);
		res.send("N/A");
	});
};