import { Router } from "express";
import { PAYMENT } from "../controllers/PaymentController/PaymentsController";
import { PAYMENT_NOTIFICATION } from "../controllers/PaymentController/PaymentNotification";
const router = Router();


router.post("/", PAYMENT);
router.post("/info",PAYMENT_NOTIFICATION);
router.get("/infor",PAYMENT_NOTIFICATION);


export = router;