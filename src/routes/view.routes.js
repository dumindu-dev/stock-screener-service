const express = require("express")
const router = express.Router()
const ViewController = require("../controllers/view.controller")

router.post('/getAll', [
	ViewController.getViews
]);

router.post('/createView', [
	ViewController.createView
]);

module.exports = router