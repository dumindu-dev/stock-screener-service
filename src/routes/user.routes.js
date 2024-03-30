const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user.controller")

router.post('/getUserSettings', [
	UserController.getUserSettings
]);

router.post('/updateDividendAlertSetting', [
	UserController.updateDividendAlertSetting
]);

router.post('/getTelegramToken', [
	UserController.getTelegramToken
]);

router.post('/disconnectTelegram', [
	UserController.disconnectTelegram
]);

module.exports = router