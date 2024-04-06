const express = require("express")
const router = express.Router()
const DividendController = require("../controllers/dividend.controller")

router.post('/getNextWeekDividends', [
	DividendController.getNextWeekDividends
]);

router.post('/getHighestDividendYield', [
	DividendController.getHighestDividendYield
]);

module.exports = router