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
exports.GET_STOCK = void 0;
const Stock_1 = require("../../models/Stock");
const GET_STOCK = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allStock = yield Stock_1.StockModel.find({});
        if (allStock) {
            const allStockMapped = allStock.map((el) => {
                return ({
                    _id: el._id,
                    name: el.name,
                    stock: el.stock
                });
            });
            res.status(200).json(allStockMapped);
        }
    }
    catch (err) {
        res.status(400).send(`Error en el controler GET_STOCK: ${err}`);
    }
});
exports.GET_STOCK = GET_STOCK;
