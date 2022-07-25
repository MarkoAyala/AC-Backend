import { Router } from "express";
import { GET_STOCK } from "../controllers/Stock/getStock";
import {CREATE_STOCK} from '../controllers/Stock/postStock';
const router= Router();

router.get('/',GET_STOCK);
router.post('/',CREATE_STOCK);



export = router;