import { Router } from "express";
const router = Router();
import userRouter from "./userRoute";
import productRouter from './productRoute';

router.use("/user", userRouter);
router.use('/product', productRouter);

export = router;