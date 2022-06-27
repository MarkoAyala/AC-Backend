"use strict";
const express_1 = require("express");
const postUser_1 = require("../controllers/User/postUser");
const getUser_1 = require("../controllers/User/getUser");
const editUser_1 = require("../controllers/User/editUser");
const router = (0, express_1.Router)();
router.post("/", postUser_1.CREATE_USER);
router.get('/', getUser_1.GET_USER);
router.put('/', editUser_1.EDIT_USER);
module.exports = router;
