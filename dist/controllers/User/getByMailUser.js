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
exports.GET_USER_BY_EMAIL = void 0;
/* import { UserMapped } from "../../interfaces/User"; */
const User_1 = require("../../models/User");
const GET_USER_BY_EMAIL = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname } = req.query;
    try {
        if (email) {
            const userByMail = yield User_1.UserModel.findOneAndUpdate({
                email: email, nickname: nickname
            }, {
                $setOnInsert: { hola: 'me cree' }
            }, {
                returnOriginal: false,
                upsert: true
            });
            res.status(200).json(userByMail);
        }
        else {
            res.status(400).send('No se encontró el usuario requerido.,');
        }
    }
    catch (err) {
        res.status(400).send(`Error en el controller GET_USER_BY_MAIL: ${err.message}`);
    }
});
exports.GET_USER_BY_EMAIL = GET_USER_BY_EMAIL;
