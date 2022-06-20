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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET_USER = void 0;
const User_1 = __importDefault(require("../../models/User"));
const GET_USER = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, role, country } = req.body;
    try {
        const createUser = { firstName: firstName, lastName: lastName, email: email, password: password, role: role, country: country };
        const created = yield User_1.default.create(createUser);
        if (created) {
            res.status(200).json(created);
        }
        else {
            throw new Error("No se pudo crear el usuario");
        }
    }
    catch (error) {
        console.log("errorsaki", error);
    }
});
exports.GET_USER = GET_USER;
