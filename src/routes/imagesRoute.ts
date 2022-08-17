import { Router } from "express";
import { GET_IMAGES } from "../controllers/ImagesController/getImages";
import { EDIT_IMAGES } from "../controllers/ImagesController/editImages";
import { POST_IMAGES } from "../controllers/ImagesController/postImages";
const router = Router();

router.get('/', GET_IMAGES);
router.put('/', EDIT_IMAGES);
router.post('/', POST_IMAGES);


export = router;