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
exports.GET_PRODUCT_BY_SIZE = void 0;
const Product_1 = require("../../models/Product");
//import { ProductMapped } from "../../interfaces/Product";
const GET_PRODUCT_BY_SIZE = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (req.query.size) next();
    //else{
    const { size } = req.query;
    try {
        const allProducts = yield Product_1.ProductModel.find({}).populate("stock");
        if (allProducts) {
            const allProductsMapped = allProducts.map((el) => {
                let product = el.stock.stock.forEach((stockeado) => {
                    if (stockeado[size] > 0) {
                        return true;
                    }
                });
                if (product === true) {
                    return ({
                        _id: el._id,
                        name: el.name,
                        price: el.price,
                        stock: el.stock,
                        url: el.url,
                        description: el.description,
                        tags: el.tags.map((e) => { return e; }),
                    });
                }
            });
            res.status(200).json(allProductsMapped);
        }
    }
    catch (err) {
        res.status(400).send(`Error en controller GET_USER: ${err.message}`);
    }
    //}
});
exports.GET_PRODUCT_BY_SIZE = GET_PRODUCT_BY_SIZE;