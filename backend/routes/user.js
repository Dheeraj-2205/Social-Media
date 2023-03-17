const express = require("express");
const {register} = require("../controllers/user")
const router = express.Router();

router.route("/register").post()

module.exports = router;