import { Router } from "express";
import { CREATE_PRODUCT } from "../controllers/Product/postProduct";
import { GET_PRODUCT } from "../controllers/Product/getProducts";
import { GET_PRODUCT_BY_SIZE } from "../controllers/Product/getProductsBySize";
import { GET_PRODUCT_BY_SIZE_AND_COLOR } from "../controllers/Product/getProductBySizeAndColor";
import { GET_PRODUCT_BY_COLOR } from "../controllers/Product/getProductByColor";
import { GET_PRODUCT_BY_TAG } from "../controllers/Product/getProductByTag";
import { DELETE_PRODUCT } from "../controllers/Product/deleteProduct";
import { GET_PRODUCT_BY_ID } from "../controllers/Product/getProductById";
const router = Router();

router.post("/", CREATE_PRODUCT);
router.get('/', GET_PRODUCT);
router.get('/:_id', GET_PRODUCT_BY_ID);
router.get('/', GET_PRODUCT_BY_TAG);
router.get('/', GET_PRODUCT_BY_SIZE);
router.put('/', DELETE_PRODUCT);
router.get('/', GET_PRODUCT_BY_SIZE_AND_COLOR);
router.get('/', GET_PRODUCT_BY_COLOR);


export = router;