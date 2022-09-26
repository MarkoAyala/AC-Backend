import { Router } from "express";
import { PAYMENT } from "../controllers/PaymentController/PaymentsController";
import { PAYMENT_NOTIFICATION } from "../controllers/PaymentController/PaymentNotification";
const router = Router();


router.post("/", PAYMENT);
router.get("/info",PAYMENT_NOTIFICATION);


export = router;