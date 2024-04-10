const Dividend = require("../models/dividend.model");
const User = require("../models/user.model");
const axios = require("axios");
const config = require('../config');

const telegramToken = config.telegramToken;

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${telegramToken}`;

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

exports.sendDividendTelegramUpdates = async (req, res) => {
	let alertEnabledUsers = await User.find({"$and":[{"telegramChatId":{"$ne":""}},{"settings.telegram_dividends":{"$eq":1}}]});
	if(alertEnabledUsers.length > 0){
		const returnList = await getUpcomingDividendList();
		if(returnList.length>0){
			let telegramMessage = "Upcoming dividend payments\n";

			returnList.forEach(payment =>{
				telegramMessage+="\n";
				telegramMessage+=(`Company: ${payment.company} (${payment.symbol}) \n`);
				telegramMessage+=`Amount: ${payment.amount}\n`;
				telegramMessage+=`Current price: ${payment.currentPrice}\n`;
				telegramMessage+=`XD date: ${payment.xddate}\n`;
			});

			alertEnabledUsers.forEach(async(user)=>{
				const response = await axios.post(TELEGRAM_API_BASE+"/sendMessage",{
					"chat_id":user.telegramChatId,
					"text":telegramMessage
				});
				//console.log(response);
			})
		}
	}
	res.send({success:1,description:"Updates have been sent to users: "+alertEnabledUsers.length});
};