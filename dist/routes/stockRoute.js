"use strict";
const express_1 = require("express");
const getStock_1 = require("../controllers/Stock/getStock");
const postStock_1 = require("../controllers/Stock/postStock");
const router = (0, express_1.Router)();
router.get('/', getStock_1.GET_STOCK);
router.post('/', postStock_1.CREATE_STOCK);
module.exports = router;
