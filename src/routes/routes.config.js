const express = require("express")
const router = express.Router()

const AuthMiddleware = require("../middleware/auth.middleware");

const ViewRouter = require("./view.routes");
const AuthRouter = require("./auth.routes");
const SiteRouter = require("./site.routes");
const StockRouter = require("./stock.routes");
const DividendRouter = require("./dividend.routes");
const UserRouter = require("./user.routes");
const FilterRouter = require("./filter.routes");
const EconomicEventRouter = require("./economicEvent.routes");

router.use(AuthMiddleware);
router.use('/views', ViewRouter);
router.use('/auth', AuthRouter);
router.use('/site', SiteRouter);
router.use('/stock', StockRouter);
router.use('/dividends', DividendRouter);
router.use('/users', UserRouter);
router.use('/filters', FilterRouter);
router.use('/economicEvents', EconomicEventRouter);

module.exports = router;