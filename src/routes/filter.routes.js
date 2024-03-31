const express = require("express")
const router = express.Router()
const FilterController = require("../controllers/filter.controller")

router.post('/filterStocks', [
	FilterController.filterStocks
]);

router.post('/saveFilter', [
	FilterController.saveFilter
]);

router.post('/getAll', [
	FilterController.getAll
]);

router.post('/getFilter', [
	FilterController.getFilter
]);

router.post('/updateFilter', [
	FilterController.updateFilter
]);
router.post('/deleteFilter', [
	FilterController.deleteFilter
]);

module.exports = router