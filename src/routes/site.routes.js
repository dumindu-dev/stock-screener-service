const express = require("express")
const router = express.Router()
const SiteController = require("../controllers/site.controller")

router.post('/getLastPriceUpdateTime', [
	SiteController.getLastPriceUpdateTime
]);

router.post('/getActiveUserCount', [
	SiteController.getActiveUserCount
]);

module.exports = router