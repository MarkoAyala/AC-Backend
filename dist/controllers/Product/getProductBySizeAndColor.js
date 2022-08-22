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
exports.GET_PRODUCT_BY_SIZE_AND_COLOR = void 0;
const Product_1 = require("../../models/Product");
const GET_PRODUCT_BY_SIZE_AND_COLOR = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.query.size && req.query.color)
        next();
    else {
        const { size, color, tags } = req.query;
        try {
            if (!size || !color) {
                throw new Error('Debe completar los campos correctamente.');
            }
            else {
                const allProducts = yield Product_1.ProductModel.find({}).populate("stock");
                if (allProducts) {
                    if (tags) {
                        const allProductsMapped = allProducts.map((el) => {
                            let product;
                            if (el.tags.includes(tags)) {
                                el.stock.stock.forEach((stockeado) => {
                                    for (let property in stockeado[0]) {
                                        if (stockeado[0][property][size] > 0 && property === color) {
                                            product = true;
                                        }
                                    }
                                });
                            }
                            if (product === true) {
                                return ({
                                    _id: el._id,
                                    name: el.name,
                                    price: el.price,
                                    stock: el.stock,
                                    url: el.url,
                                    description: el.description,
                                    tags: el.tags.filter((e) => e !== ''),
                                });
                            }
                        });
                        const result = allProductsMapped.filter((e) => e !== undefined);
                        res.status(200).json(result);
                    }
                    else {
                        const allProductsMapped = allProducts.map((el) => {
                            let product;
                            el.stock.stock.forEach((stockeado) => {
                                for (let property in stockeado[0]) {
                                    if (stockeado[0][property][size] > 0 && property === color) {
                                        product = true;
                                    }
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
                                    tags: el.tags.filter((e) => e !== ''),
                                });
                            }
                        });
                        const result = allProductsMapped.filter((e) => e !== undefined);
                        res.status(200).json(result);
                    }
                }
            }
        }
        catch (err) {
            res.status(400).send(`Error en controller GET_PRODUCT_BY_SIZE_AND_COLOR: ${err.message}`);
        }
    }
});
exports.GET_PRODUCT_BY_SIZE_AND_COLOR = GET_PRODUCT_BY_SIZE_AND_COLOR;
