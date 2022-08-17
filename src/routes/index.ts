import { Router } from "express";
const router = Router();
import userRouter from "./userRoute";
import productRouter from './productRoute';
import imagesRouter from './imagesRoute';
import stockRouter from './stockRoute';

router.use('/images', imagesRouter)
router.use("/user", userRouter);
router.use('/product', productRouter);
router.use('/stock', stockRouter);

export = router;