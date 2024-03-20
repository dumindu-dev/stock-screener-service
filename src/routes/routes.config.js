const express = require("express")
const router = express.Router()

const AuthMiddleware = require("../middleware/auth.middleware");

const ViewRouter = require("./view.routes")
const AuthRouter = require("./auth.routes")

router.use(AuthMiddleware);
router.use('/views', ViewRouter);
router.use('/auth', AuthRouter);

module.exports = router;