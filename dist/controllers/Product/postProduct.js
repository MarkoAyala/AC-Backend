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
exports.CREATE_PRODUCT = void 0;
const Product_1 = require("../../models/Product");
const CREATE_PRODUCT = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, stock, url, description, tags, } = req.body;
        if (!name || !price || !stock || !url || !tags || !description) {
            throw new Error("Debe completar todos los campos.");
        }
        else {
            const existProduct = yield Product_1.ProductModel.findOne({ name: name });
            if (existProduct) {
                throw new Error(`Ya existe este producto ${existProduct}`);
            }
            else {
                const createProduct = {
                    name: name,
                    price: price,
                    stock: stock,
                    url: url,
                    description: description,
                    tags: tags,
                };
                const created = yield Product_1.ProductModel.create(createProduct);
                if (created) {
                    res.status(200).json(created);
                }
                else {
                    throw new Error("No se pudo crear el producto");
                }
            }
        }
    }
    catch (error) {
        res.status(400).json(`Error en el controller CREATE_PRODUCT: ${error}`);
    }
});
exports.CREATE_PRODUCT = CREATE_PRODUCT;
/* Este controller crea un producto y actualiza el stock de 1 color de 1 talle */ 
