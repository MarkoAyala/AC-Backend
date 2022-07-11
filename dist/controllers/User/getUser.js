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
const GET_USER = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, nickname } = req.body;
    if (!firstName || !nickname)
        next();
    else {
        try {
            const allUsers = yield User_1.UserModel.find({}).populate("shoppingCart");
            if (allUsers) {
                const allUsersMapped = allUsers.map((el) => {
                    return ({
                        _id: el._id,
                        firstName: el.firstName,
                        lastName: el.lastName,
                        nickname: el.nickname,
                        email: el.email,
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
    }
});
exports.GET_USER = GET_USER;
