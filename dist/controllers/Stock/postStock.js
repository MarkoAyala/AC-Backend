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
exports.CREATE_STOCK = void 0;
const Stock_1 = require("../../models/Stock");
const CREATE_STOCK = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, stock } = req.body;
        if (!name || !stock) {
            throw new Error("Debe completar todos los campos.");
        }
        else {
            const existStock = yield Stock_1.StockModel.findOne({ name: name });
            if (existStock) {
                throw new Error(`Este stock ya existe:${existStock}`);
            }
            else {
                const createStock = {
                    name: name,
                    stock: stock
                };
                const created = yield Stock_1.StockModel.create(createStock);
                if (created) {
                    res.status(200).json(created);
                }
                else {
                    throw new Error("No se pudo crear el stock");
                }
            }
        }
    }
    catch (err) {
        res.status(400).json(`Error en el controler CREATE_STOCK:${err.messagge}`);
    }
});
exports.CREATE_STOCK = CREATE_STOCK;
