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
exports.DELETE_PRODUCT = void 0;
const Product_1 = require("../../models/Product");
const cloudinary_1 = require("../../cloudinary");
const DELETE_PRODUCT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, url } = req.body;
    try {
        if (!_id || !url) {
            throw new Error("The id entered is undefined or null, please try again.");
        }
        else {
            const deletedProduct = yield Product_1.ProductModel.deleteOne({ _id: _id });
            if (deletedProduct.deletedCount) {
                for (let property in url) {
                    let index = url[property].indexOf('/AltoCuero');
                    let latest = url[property].indexOf('.png');
                    let final = url[property].substring(index + 11, latest);
                    yield (0, cloudinary_1.destroyMultimedia)(`AltoCuero/${final}`);
                }
                res.status(200).json(`${deletedProduct.deletedCount} ha sido eliminado`);
            }
            else {
                throw new Error(`${deletedProduct.deletedCount} have been matched with the id entered, please check the id entered.`);
            }
        }
    }
    catch (err) {
        res.status(400).json(`An error has been ocurred in controller DELETE_COMMENT: ${err.message}`);
    }
});
exports.DELETE_PRODUCT = DELETE_PRODUCT;
//_id:"632398075ee81d0020f43e1c",
//"url": {
//    "img1": "https://res.cloudinary.com/morgan22/image/upload/v1663277053/AltoCuero/g0ft32q4j1glnofal14c.png"
//  },
