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
exports.CREATE_USER = void 0;
const User_1 = require("../../models/User");
const CREATE_USER = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, nickname, email, role, country, } = req.body;
        if (!firstName || !lastName || !email || !role || !country || !nickname) {
            throw new Error("Debe completar todos los campos.");
        }
        else {
            const existUserName = yield User_1.UserModel.findOne({ email: email });
            if (existUserName) {
                throw new Error(`Ya existe este nombre de usuario: ${existUserName}`);
            }
            else {
                const createUser = {
                    firstName: firstName,
                    lastName: lastName,
                    nickname: nickname,
                    email: email,
                    role: role,
                    country: country,
                    shoppingCart: [],
                };
                const created = yield User_1.UserModel.create(createUser);
                if (created) {
                    res.status(200).json(created);
                }
                else {
                    throw new Error("No se pudo crear el usuario");
                }
            }
        }
    }
    catch (error) {
        res.status(400).json(`Error en el controller CREATE_USER: ${error.mesagge}`);
    }
});
exports.CREATE_USER = CREATE_USER;
