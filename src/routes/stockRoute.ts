import { Router } from "express";
import {CREATE_STOCK} from '../controllers/Stock/postStock';
const router= Router();

router.post('/',CREATE_STOCK);


export = router;