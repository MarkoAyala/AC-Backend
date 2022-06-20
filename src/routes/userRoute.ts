import { Router } from "express";
import { GET_USER } from "../controllers/User/getUser";
const router = Router();


router.post("/", GET_USER);











export = router;