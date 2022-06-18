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
exports.database = void 0;
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const { DB_PASSWORD, DB_NAME } = process.env;
const database = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongoose_1.default.connect(`mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.nox4h.mongodb.net/?retryWrites=true&w=majority`);
    /* .then(res=> console.log("mongoose conectado")) */
    console.log('Database is connected to', db.connection.host);
});
exports.database = database;
(0, exports.database)();
module.exports = mongoose_1.default;
