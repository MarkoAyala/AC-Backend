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
exports.POST_IMAGES = void 0;
const Images_1 = require("../../models/Images");
const POST_IMAGES = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, url } = req.body;
        if (!name || !url) {
            throw new Error('Debe completar todos los campos.');
        }
        else {
            const existImage = yield Images_1.ImagesModel.findOne({ name: name });
            if (existImage) {
                throw new Error(`Ya existe esta imagen: ${existImage}`);
            }
            else {
                const createImage = {
                    name: name,
                    url: url
                };
                const created = yield Images_1.ImagesModel.create(createImage);
                if (created) {
                    res.status(200).json(created);
                }
                else {
                    throw new Error('No se pudo crear la imagen');
                }
            }
        }
    }
    catch (error) {
        res.status(400).json(`Error en el controler POST_IMAGES: ${error.mesagge}`);
    }
});
exports.POST_IMAGES = POST_IMAGES;
