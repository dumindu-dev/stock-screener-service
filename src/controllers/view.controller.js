const View = require("../models/view.model");
const Stock = require("../models/stock.model");

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