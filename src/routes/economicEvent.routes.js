const express = require("express")
const router = express.Router()
const EconomicEventController = require("../controllers/economicEvent.controller")

router.post('/getMarketEvents', [
	EconomicEventController.getMarketEvents
]);

module.exports = router