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
exports.DELETE_STOCK = void 0;
const Stock_1 = require("../../models/Stock");
const Product_1 = require("../../models/Product");
const DELETE_STOCK = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.query;
    try {
        if (!_id) {
            throw new Error("No existe un id");
        }
        else {
            const stockMapped = yield Product_1.ProductModel.find({}).populate("stock");
            if (stockMapped) {
                const exist = stockMapped.filter((element) => element.stock._id.toString() === _id);
                if (exist[0]) {
                    res.status(200).json({ eliminado: false, productos: exist });
                }
                else {
                    const deletedStock = yield Stock_1.StockModel.deleteOne({ _id: _id });
                    if (deletedStock.deletedCount) {
                        res.status(200).json({ eliminado: true, productos: [] });
                    }
                    else {
                        throw new Error(`${deletedStock.deletedCount} error en el controller delete stock no pudo eliminar`);
                    }
                }
            }
        }
    }
    catch (err) {
        res.status(400).json(`An error has been ocurred in controller DELETE_COMMENT: ${err.message}`);
    }
});
exports.DELETE_STOCK = DELETE_STOCK;
