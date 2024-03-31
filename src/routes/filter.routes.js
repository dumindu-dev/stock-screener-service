const express = require("express")
const router = express.Router()
const FilterController = require("../controllers/filter.controller")

router.post('/filterStocks', [
	FilterController.filterStocks
]);

router.post('/saveFilter', [
	FilterController.saveFilter
]);

module.exports = router