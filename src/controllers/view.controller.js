const View = require("../models/view.model");
const Stock = require("../models/stock.model");
const User = require("../models/user.model");
const axios = require("axios");
const config = require('../config');

const telegramToken = config.telegramToken;
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${telegramToken}`;

function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

async function calculateResults(stocks){
	const viewStocks = await Stock.find({symbol:{$in:stocks}}, "-_id symbol longName currentPrice 52WeekChange previousClose");
	let returnStockSet = [];
	viewStocks.forEach(stk =>{
		const stkPlain = stk.toObject();
		if(Object.keys(stkPlain).length == 5){
			stkPlain.change = ((stkPlain.currentPrice - stkPlain.previousClose)/stkPlain.previousClose)*100;
			returnStockSet.push(stkPlain);
		}
	});
	return returnStockSet;
}

function calculatePerfomance(results){
	let totalChange = 0;
	results.forEach(result=>{
		totalChange+=result.change;
	});
	console.log(totalChange);
	console.log(results.length*100);
	return ((totalChange/(results.length*100))*100).toFixed(2);
}

exports.getViews = async (req, res) => {
	const views = await View.find({owner_id:req.auth.userId}, "-_id view_id view_name view_description stocks result performance");
	res.send(views);
};

exports.createView = async (req, res) => {
	let inView = {
		view_id:String(getRandomInt(1,999999999)),
		view_name:req.body.name,
		view_description:req.body.description,
		stocks:req.body.stocks,
		owner_id:req.auth.userId
	}
	inView.result = await calculateResults(req.body.stocks);
	inView.performance = String(await calculatePerfomance(inView.result))+"%";

	const creatingView = new View(inView);
	await creatingView.save();
	res.send({success:1,description:"New view is created successfully."});
};

exports.getSingleView = async (req, res) => {
	console.log(req.body.view_id);
	const currentView = await View.findOne({owner_id:req.auth.userId,view_id:req.body.view_id}, "-_id view_id view_name view_description stocks result performance");
	res.send(currentView);
};

exports.updateView = async (req, res) => {

	let latestView = {
		view_name:req.body.name,
		view_description:req.body.description,
		stocks:req.body.stocks
	};
	latestView.result = await calculateResults(req.body.stocks);
	latestView.performance = String(await calculatePerfomance(latestView.result))+"%";

	await View.updateOne({owner_id:req.auth.userId,view_id:req.body.view_id},latestView);

	res.send({success:1,description:"View is updated successfully."});
};

exports.deleteView = async (req, res) => {

	await View.deleteOne({owner_id:req.auth.userId,view_id:req.body.view_id});

	res.send({success:1,description:"View is deleted successfully."});
};

exports.bestPerformingView = async (req, res) => {
	const views = await View.find({owner_id:req.auth.userId}, "-_id view_id view_name performance");

	if(views.length > 0){
		let returnView =[views[0]];

		views.forEach(view =>{
			if(Number(view.performance.replace("%","")) > Number(returnView[0].performance.replace("%",""))){
				returnView[0]= view;
			}
		});

		res.send(returnView);
	}else{
		res.send([]);
	}
};

exports.updateViewPerformance = async (req, res) => {

	const viewList = await View.find({});

	viewList.forEach(async(singleView) =>{
		console.log("Updating view: "+singleView.view_id);
		const viewResult = await calculateResults(singleView.stocks);
		const viewPerformance = String(await calculatePerfomance(viewResult))+"%";
		await View.updateOne({view_id:singleView.view_id},{"$set":{"result":viewResult,"performance":viewPerformance}});
	});

	res.send({success:1,description:"Views updated successfully."});
};

exports.sendViewPerformanceTelegramAlerts = async (req, res) => {

	let alertEnabledUsers = await User.find({"telegramChatId":{"$ne":""}});
	if(alertEnabledUsers.length > 0){
		alertEnabledUsers.forEach(async(user)=>{
			const user_Id = user.userId;
			const telegramChatId = user.telegramChatId;

			const view_list = await View.find({owner_id:user_Id});
			let telegramMessage = "View performance update\n";
			if(view_list.length >0){
				view_list.forEach(singleView=>{
					telegramMessage+="\n";
					telegramMessage+=`${singleView.view_name} \n`;
					telegramMessage+=`${singleView.performance} \n`;
				});
				await axios.post(TELEGRAM_API_BASE+"/sendMessage",{
					"chat_id":telegramChatId,
					"text":telegramMessage
				});
			}
			//console.log(response);
		});
	}
	res.send({success:1,description:"Updates have been sent to users: "+alertEnabledUsers.length});
};