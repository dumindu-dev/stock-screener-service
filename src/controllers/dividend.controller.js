const Dividend = require("../models/dividend.model");

async function getUpcomingDividendList(){
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
				dividendYield:String(value.yield *100)+"%",
				rawYield: value.yield
			});
		});
	});
	return returnList;
}

exports.getNextWeekDividends = async (req, res) => {
	let returnList = await getUpcomingDividendList();
	res.send(returnList);
};

exports.getHighestDividendYield = async (req, res) => {
	let returnList = await getUpcomingDividendList();
	
	if(returnList.length > 0){
		let responseArr = [returnList[0]];
		returnList.forEach(function(dv){
			if(dv.rawYield && !responseArr[0].rawYield) responseArr[0]=dv;
			if(dv.rawYield && responseArr[0].rawYield < dv.rawYield){
				responseArr[0]=dv;
			}
		});
		res.send(responseArr);
	}else{
		res.send([]);
	}
};