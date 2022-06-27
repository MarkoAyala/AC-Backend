"use strict";
const express_1 = require("express");
const postProduct_1 = require("../controllers/Product/postProduct");
const getProducts_1 = require("../controllers/Product/getProducts");
const router = (0, express_1.Router)();
router.post("/", postProduct_1.CREATE_PRODUCT);
router.get('/', getProducts_1.GET_PRODUCT);
module.exports = router;
