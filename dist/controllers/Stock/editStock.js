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
exports.EDIT_STOCK = void 0;
const Stock_1 = require("../../models/Stock");
const EDIT_STOCK = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, stock } = req.body;
    try {
        if (!id) {
            throw new Error('Especifique el id del stock que quiere editar');
        }
        const oldStock = yield Stock_1.StockModel.updateOne({ _id: id }, {
            name: name && name,
            stock: stock && stock
        });
        if (oldStock) {
            res.status(200).json(oldStock);
        }
        else {
            throw new Error('Ningun stock fue modificado, revise los datos');
        }
    }
    catch (err) {
        res.status(400).send(`Error en el controller EDIT_STOCK: ${err}`);
    }
});
exports.EDIT_STOCK = EDIT_STOCK;
