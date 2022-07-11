import { Router } from "express";
import { CREATE_USER } from "../controllers/User/postUser";
import { GET_USER } from "../controllers/User/getUser";
import { EDIT_USER } from "../controllers/User/editUser";
import { GET_USER_BY_EMAIL } from "../controllers/User/getByMailUser";
const router = Router();

router.get('/', GET_USER);
router.get('/', GET_USER_BY_EMAIL);
router.put('/',EDIT_USER);
router.post("/", CREATE_USER);











export = router;