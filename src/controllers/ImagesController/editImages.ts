import { NextFunction, Request, Response } from "express";
import { ImagesModel } from "../../models/Images";


export const EDIT_IMAGES = async (
    req:Request,
    res:Response,
    _next:NextFunction
    ) => {
        try{
            const {
                name,
                url,
                public_id
            } = req.body;
            if(!name){
                throw new Error('Ha ocurrido un error al editar image');
            }else{
                const imageEdited = await ImagesModel.updateOne({name:name},{
                    url: url && url,
                    public_id:public_id && public_id
                });
                res.status(200).json(imageEdited);
            }
        }catch(err){
            throw new Error('No se ha encontrado la imagen existente con el id ingresado');
        }
    }