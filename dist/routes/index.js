"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const router = (0, express_1.Router)();
const userRoute_1 = __importDefault(require("./userRoute"));
router.use("/user", userRoute_1.default);
module.exports = router;
