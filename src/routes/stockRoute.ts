import { Router } from "express";
import { EDIT_STOCK } from "../controllers/Stock/editStock";
import { GET_STOCK } from "../controllers/Stock/getStock";
import {CREATE_STOCK} from '../controllers/Stock/postStock';
const router= Router();

router.get('/',GET_STOCK);
router.post('/',CREATE_STOCK);
router.put('/', EDIT_STOCK);



export = router;