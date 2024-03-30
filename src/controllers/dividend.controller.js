const Dividend = require("../models/dividend.model");

exports.getNextWeekDividends = async (req, res) => {
	const dividendList = await Dividend.find({date:{"$gt":Math.floor(Date.now() / 1000)}}, "-_id date dividends").sort("date 1");
	
	let returnList = [];
	dividendList.forEach(dividendObject =>{
		let date = new Date(dividendObject.date*1000).toLocaleDateString("en-US");

		dividendObject.dividends.forEach(function(value, key,map){
			returnList.push({
				xddate:date,
				symbol:key,
				company:value.company,
				amount:value.amount,
				currentPrice:value.currentPrice,
				dividendYield:String(value.yield *100)+"%"
			});
		});
	});

	res.send(returnList);
};