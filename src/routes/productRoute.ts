import { Router } from "express";
import { CREATE_PRODUCT } from "../controllers/Product/postProduct";
import { GET_PRODUCT } from "../controllers/Product/getProducts";
import { GET_PRODUCT_BY_SIZE } from "../controllers/Product/getProductsBySize";
const router = Router();

router.post("/", CREATE_PRODUCT);
router.get('/', GET_PRODUCT);
router.get('/', GET_PRODUCT_BY_SIZE);











export = router;