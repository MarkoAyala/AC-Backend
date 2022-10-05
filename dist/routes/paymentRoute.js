"use strict";
const express_1 = require("express");
const PaymentsController_1 = require("../controllers/PaymentController/PaymentsController");
const PaymentNotification_1 = require("../controllers/PaymentController/PaymentNotification");
const router = (0, express_1.Router)();
router.post("/", PaymentsController_1.PAYMENT);
router.post("/info", PaymentNotification_1.PAYMENT_NOTIFICATION);
module.exports = router;
