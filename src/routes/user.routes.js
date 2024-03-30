const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user.controller")

router.post('/getUserSettings', [
	UserController.getUserSettings
]);

router.post('/updateDividendAlertSetting', [
	UserController.updateDividendAlertSetting
]);

module.exports = router