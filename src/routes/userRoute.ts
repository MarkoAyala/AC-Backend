import { Router } from "express";
import { CREATE_USER } from "../controllers/User/postUser";
import { GET_USER } from "../controllers/User/getUser";
const router = Router();

router.get('/', GET_USER);
router.post("/", CREATE_USER);











export = router;