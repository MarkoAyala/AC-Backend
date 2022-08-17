import { NextFunction, Request, Response } from "express";
import { ImagesMapped } from "../../interfaces/Images";
import { ImagesModel } from "../../models/Images";

export const POST_IMAGES = async (
    req:Request,
    res:Response,
    _next:NextFunction
    ) => {
        try{
            const {
                name,
                url
            }:ImagesMapped = req.body;
            if(!name || !url){
                throw new Error('Debe completar todos los campos.');
            }else{
                const existImage = await ImagesModel.findOne({name:name});
                if(existImage){
                    throw new Error(`Ya existe esta imagen: ${existImage}`);
                }else{
                    const createImage = {
                        name:name,
                        url:url
                    };
                    const created = await ImagesModel.create(createImage);
                    if(created){
                        res.status(200).json(created);
                    }else{
                        throw new Error('No se pudo crear la imagen');
                    }
                }
            }
        }catch(error:string|any){
            res.status(400).json(`Error en el controler POST_IMAGES: ${error.mesagge}`);
        }
    }