import { Router } from "express";
import { CREATE_USER } from "../controllers/User/postUser";
import { GET_USER } from "../controllers/User/getUser";
import { EDIT_USER } from "../controllers/User/editUser";
const router = Router();

router.post("/", CREATE_USER);
router.get('/', GET_USER);
router.put('/',EDIT_USER);











export = router;