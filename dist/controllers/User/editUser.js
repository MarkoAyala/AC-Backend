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
exports.EDIT_USER = void 0;
const User_1 = require("../../models/User");
const EDIT_USER = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, firstName, lastName, nickname, email, role, country, shoppingCart } = req.body;
        if (!id) {
            throw new Error('Ha ocurrido un error al editar el usuario');
        }
        else {
            const userEdited = yield User_1.UserModel.updateOne({ _id: id }, {
                firstName: firstName && firstName,
                lastName: lastName && lastName,
                nickname: nickname && nickname,
                email: email && email,
                role: role && role,
                country: country && country,
                shoppingCart: shoppingCart && shoppingCart
            });
            res.status(200).json(userEdited);
        }
    }
    catch (err) {
        throw new Error("No se ha encontrado un usuario existente con el id ingresado.");
    }
});
exports.EDIT_USER = EDIT_USER;
