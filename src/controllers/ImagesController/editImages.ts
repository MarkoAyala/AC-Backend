import { NextFunction, Request, Response } from "express";
import { destroyMultimedia } from "../../cloudinary";
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
                const DeleteImage = await ImagesModel.findOne({name:name});
                if(DeleteImage){
                    const imageEdited = await ImagesModel.updateOne({name:name},{
                        url: url && url,
                        public_id:public_id && public_id
                    });
                    destroyMultimedia(DeleteImage?.public_id)
                    res.status(200).json(imageEdited);
                }else{
                    throw new Error('No se encuentra la imagen');
                }
            }
        }catch(err){
            throw new Error('No se ha encontrado la imagen existente con el id ingresado');
        }
    }