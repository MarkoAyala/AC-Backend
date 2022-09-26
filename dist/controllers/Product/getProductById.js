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
exports.GET_PRODUCT_BY_ID = void 0;
const Product_1 = require("../../models/Product");
const GET_PRODUCT_BY_ID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.size || req.query.color || req.query.tags)
        next();
    else {
        try {
            const { id } = req.query;
            const { _id } = req.params;
            if (!id && !_id) {
                throw new Error('Debe completar los campos correctamente (ID)');
            }
            else {
                if (id) {
                    const allProducts = yield Product_1.ProductModel.find({ _id: id }).populate("stock");
                    if (allProducts) {
                        const allProductsMapped = allProducts.map((el) => {
                            return ({
                                _id: el._id,
                                name: el.name,
                                price: el.price,
                                stock: el.stock,
                                url: el.url,
                                description: el.description,
                                tags: el.tags.filter((e) => e !== ''),
                            });
                        });
                        res.status(200).json(allProductsMapped);
                    }
                }
                else {
                    const allProducts = yield Product_1.ProductModel.find({ _id: _id }).populate("stock");
                    if (allProducts) {
                        const allProductsMapped = allProducts.map((el) => {
                            return ({
                                _id: el._id,
                                name: el.name,
                                price: el.price,
                                stock: el.stock,
                                url: el.url,
                                description: el.description,
                                tags: el.tags.filter((e) => e !== ''),
                            });
                        });
                        res.status(200).json(allProductsMapped);
                    }
                }
            }
        }
        catch (err) {
            res.status(400).send(`Error en controller GET_PRODUCT_BY_ID : ${err.message}`);
        }
    }
});
exports.GET_PRODUCT_BY_ID = GET_PRODUCT_BY_ID;