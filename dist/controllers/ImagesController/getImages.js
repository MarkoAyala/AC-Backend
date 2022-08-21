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
exports.GET_IMAGES = void 0;
const Images_1 = require("../../models/Images");
const GET_IMAGES = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allImages = yield Images_1.ImagesModel.find({});
        if (allImages) {
            const allImagesMapped = allImages.map((el) => {
                return ({
                    _id: el._id,
                    name: el.name,
                    url: el.url,
                    public_id: el.public_id
                });
            });
            res.status(200).json(allImagesMapped);
        }
    }
    catch (err) {
        res.status(400).send(`Error en el controller GET_IMAGES: ${err.message}`);
    }
});
exports.GET_IMAGES = GET_IMAGES;
