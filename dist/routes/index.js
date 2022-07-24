"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const router = (0, express_1.Router)();
const userRoute_1 = __importDefault(require("./userRoute"));
const productRoute_1 = __importDefault(require("./productRoute"));
const stockRoute_1 = __importDefault(require("./stockRoute"));
router.use("/user", userRoute_1.default);
router.use('/product', productRoute_1.default);
router.use('/stock', stockRoute_1.default);
module.exports = router;
