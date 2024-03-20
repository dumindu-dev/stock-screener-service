const express = require("express")
const router = express.Router()
const ViewController = require("../controllers/view.controller")

router.get('/getAll', [
	ViewController.getViews
]);

module.exports = router