import { Router } from "express";
import { CREATE_PRODUCT } from "../controllers/Product/postProduct";
import { GET_PRODUCT } from "../controllers/Product/getProducts";
const router = Router();

router.post("/", CREATE_PRODUCT);
router.get('/', GET_PRODUCT);











export = router;