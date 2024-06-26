const express = require("express")
const router = express.Router()
const ViewController = require("../controllers/view.controller")

router.post('/getAll', [
	ViewController.getViews
]);

router.post('/getSingleView', [
	ViewController.getSingleView
]);

router.post('/createView', [
	ViewController.createView
]);

router.post('/updateView', [
	ViewController.updateView
]);

router.post('/deleteView', [
	ViewController.deleteView
]);

router.post('/bestPerformingView', [
	ViewController.bestPerformingView
]);

router.post('/updateViewPerformance', [
	ViewController.updateViewPerformance
]);

router.post('/sendViewPerformanceTelegramAlerts', [
	ViewController.sendViewPerformanceTelegramAlerts
]);

module.exports = router