import { NextFunction, Request, Response } from "express";
import { ImagesModel } from "../../models/Images";


export const EDIT_IMAGES = async (
    req:Request,
    res:Response,
    _next:NextFunction
    ) => {
        try{
            const {
                _id,
                name,
                url
            } = req.body;
            if(!_id){
                throw new Error('Ha ocurrido un error al editar image');
            }else{
                const imageEdited = await ImagesModel.updateOne({_id:_id},{
                    name: name && name,
                    url: url && url
                });
                res.status(200).json(imageEdited);
            }
        }catch(err){
            throw new Error('No se ha encontrado la imagen existente con el id ingresado');
        }
    }