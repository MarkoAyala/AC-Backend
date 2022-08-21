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
exports.EDIT_IMAGES = void 0;
const Images_1 = require("../../models/Images");
const EDIT_IMAGES = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, url, public_id } = req.body;
        if (!name) {
            throw new Error('Ha ocurrido un error al editar image');
        }
        else {
            const imageEdited = yield Images_1.ImagesModel.updateOne({ name: name }, {
                url: url && url,
                public_id: public_id && public_id
            });
            res.status(200).json(imageEdited);
        }
    }
    catch (err) {
        throw new Error('No se ha encontrado la imagen existente con el id ingresado');
    }
});
exports.EDIT_IMAGES = EDIT_IMAGES;
