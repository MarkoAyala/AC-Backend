import { NextFunction, Request, Response } from "express";
import {ProductModel , Product} from "../../models/Product";


export const GET_PRODUCT_BY_SIZE_AND_COLOR = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    if (!req.query.size && req.query.color) next();
    else{
        const {size , color , tags}:any = req.query;
    try{
        if(!size || !color){
            throw new Error('Debe completar los campos correctamente.');
        }else{
            const allProducts: Array<Product> = await ProductModel.find({}).populate("stock");
                if(allProducts){
                    if(tags){
                        const allProductsMapped:any = allProducts.map((el:any)=>{
                            let product;
                            if(el.tags.includes(tags)){
                                el.stock.stock.forEach((stockeado:any)=>{
                                    for(let property in stockeado[0]){
                                        if(stockeado[0][property][size]>0 && property === color){
                                            product =  true
                                        }
                                    }
                                });
                            }
                            if(product === true){
                                return ({
                                        _id: el._id,
                                        name:el.name,
                                        price:el.price,
                                        stock:el.stock,
                                        url:el.url,
                                        description:el.description,
                                        tags:el.tags.filter((e:string)=>e !== ''),
                                         });
                            }
                            });
                            const result = allProductsMapped.filter((e:any)=> e !== undefined)
                            res.status(200).json(result);
                    }else{
                        const allProductsMapped:any = allProducts.map((el:any)=>{
                            let product;
                            el.stock.stock.forEach((stockeado:any)=>{
                                for(let property in stockeado[0]){
                                    if(stockeado[0][property][size]>0 && property === color){
                                        product =  true
                                    }
                                }
                            })
                            if(product === true){
                                return ({
                                        _id: el._id,
                                        name:el.name,
                                        price:el.price,
                                        stock:el.stock,
                                        url:el.url,
                                        description:el.description,
                                        tags:el.tags.filter((e:string)=>e !== ''),
                                         });
                            }
                            });
                            const result = allProductsMapped.filter((e:any)=> e !== undefined)
                            res.status(200).json(result);
                    }
                }
        }
        }catch(err:any | unknown){
            res.status(400).send(`Error en controller GET_PRODUCT_BY_SIZE_AND_COLOR: ${err.message}`);
    }
}
}