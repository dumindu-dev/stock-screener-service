const express = require("express")
const router = express.Router()
const ViewController = require("../controllers/auth.controller")

router.get('/authenticate', [
	ViewController.authenticate
]);

module.exports = router