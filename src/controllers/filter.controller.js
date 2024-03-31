const Stock = require("../models/stock.model");
const Filter = require("../models/filter.model");
const helpers = require("../utils/Helpers")

async function filterStocksByParams(parameterList){

	let mongoDBFilter = {};
	let mongoDBAttrList = ["symbol", "longName"];

	const allowedExprs = {
		"lt":"$lt",
		"gt":"$gt"
	};

	parameterList.forEach(paramObject=>{
		if(allowedExprs[paramObject.condition] && helpers.isNumeric(paramObject.value)){
			let tmpObj = {};
			tmpObj[allowedExprs[paramObject.condition]] = Number(paramObject.value);
			mongoDBFilter[paramObject.name]=tmpObj;
			mongoDBAttrList.push(paramObject.name);
		}
	});

	mongoDBAttrList.push("-_id");
	const stocks = await Stock.find(mongoDBFilter, mongoDBAttrList.join(" "));
	mongoDBAttrList.pop();
	return ({
		result:stocks,
		total:stocks.length,
		parameters:mongoDBAttrList,
	});
}

exports.filterStocks = async (req, res) => {
	const pageNumber = req.body.page;
	const perPage = 15;

	const stocks = await filterStocksByParams(req.body.filters);
	const returnResult = stocks.result.length > 0 ? stocks.result.slice(pageNumber*perPage,(pageNumber*perPage)+perPage):[];

	res.send({
		result:returnResult,
		total:stocks.result.length,
		parameters:stocks.parameters,
		currentPage:pageNumber,
		perPage:perPage
	});
};

exports.saveFilter = async (req, res) => {
	const stocks = await filterStocksByParams(req.body.filters);

	let inFilter = {
		owner_id:req.auth.userId,
		filter_id:String(helpers.getRandomInt(1,999999999)),
		filter_name:req.body.name,
		filter_description:req.body.description,
		conditions:req.body.filters,
		result:stocks.result
	};

	let newFilter = new Filter(inFilter);
	await newFilter.save();

	res.send({success:1,description:"Filter created successfully."});
};