const express = require("express")
const router = express.Router()
const StockController = require("../controllers/stock.controller")

router.post('/searchByCompanyName', [
	StockController.searchByCompanyName
]);

module.exports = router