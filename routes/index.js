const express = require("express")
const index = require("./modules/index")

const router = express.Router()

router.use("/", index)


module.exports = router