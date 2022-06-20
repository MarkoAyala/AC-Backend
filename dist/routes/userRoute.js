"use strict";
const express_1 = require("express");
const getUser_1 = require("../controllers/User/getUser");
const router = (0, express_1.Router)();
router.post("/", getUser_1.GET_USER);
module.exports = router;
