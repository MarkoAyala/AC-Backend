"use strict";
const express_1 = require("express");
const postStock_1 = require("../controllers/Stock/postStock");
const router = (0, express_1.Router)();
router.post('/', postStock_1.CREATE_STOCK);
module.exports = router;
