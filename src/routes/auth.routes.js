const express = require("express")
const router = express.Router()
const ViewController = require("../controllers/auth.controller")

router.post('/authenticate', [
	ViewController.authenticate
]);

module.exports = router