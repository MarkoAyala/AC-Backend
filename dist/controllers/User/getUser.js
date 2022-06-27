"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER = void 0;
const User_1 = require("../../models/User");
const GET_USER = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    //if (req.query.email || req.query.user_name || req.params.id) next();
    // else{
    try {
        const allUsers = yield User_1.UserModel.find({});
        if (allUsers) {
            const allUsersMapped = allUsers.map((el) => {
                return ({
                    _id: el._id,
                    firstName: el.firstName,
                    lastName: el.lastName,
                    userName: el.userName,
                    email: el.email,
                    password: el.password,
                    role: el.role,
                    country: el.country,
                    shoppingCart: el.shoppingCart
                });
            });
            res.status(200).json(allUsersMapped);
        }
    }
    catch (err) {
        res.status(400).send(`Error en controller GET_USER: ${err.message}`);
    }
    //   }
});
exports.GET_USER = GET_USER;
