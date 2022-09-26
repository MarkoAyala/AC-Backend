"use strict";
const express_1 = require("express");
const PaymentsController_1 = require("../controllers/PaymentController/PaymentsController");
const router = (0, express_1.Router)();
router.get("/", PaymentsController_1.PAYMENT);
module.exports = router;
