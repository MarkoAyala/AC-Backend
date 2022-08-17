import { NextFunction, Request, Response } from "express";
import { ImagesMapped } from "../../interfaces/Images";
import { Images, ImagesModel } from "../../models/Images";

export const GET_IMAGES = async (
    _req:Request,
    res:Response,
    _next:NextFunction
    ) => {
        try{
            const allImages: Array<Images> = await ImagesModel.find({});
            if(allImages){
                const allImagesMapped:Array<ImagesMapped> = allImages.map((el:any)=>{
                    return({
                        _id:el._id,
                        name:el.name,
                        url:el.url
                    });
                });
                res.status(200).json(allImagesMapped);
            }
        }catch(err:any|unknown){
            res.status(400).send(`Error en el controller GET_IMAGES: ${err.message}`);
        }
    }