const express = require("express")
const router = express.Router()

const AuthMiddleware = require("../middleware/auth.middleware");

const ViewRouter = require("./view.routes")
const AuthRouter = require("./auth.routes")
const SiteRouter = require("./site.routes")
const StockRouter = require("./stock.routes")

router.use(AuthMiddleware);
router.use('/views', ViewRouter);
router.use('/auth', AuthRouter);
router.use('/site', SiteRouter);
router.use('/stock', StockRouter);

module.exports = router;