"use strict";
const express_1 = require("express");
const editStock_1 = require("../controllers/Stock/editStock");
const getStock_1 = require("../controllers/Stock/getStock");
const deleteStock_1 = require("../controllers/Stock/deleteStock");
const postStock_1 = require("../controllers/Stock/postStock");
const router = (0, express_1.Router)();
router.get('/', getStock_1.GET_STOCK);
router.post('/', postStock_1.CREATE_STOCK);
router.put('/', editStock_1.EDIT_STOCK);
router.delete('/', deleteStock_1.DELETE_STOCK);
module.exports = router;
