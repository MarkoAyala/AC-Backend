import { NextFunction, Request, Response } from "express";
import {ProductModel , Product} from "../../models/Product";


export const GET_PRODUCT_BY_COLOR = async (
    req: Request,
    res: Response,
    _next: NextFunction
    ) => {
        const {color}:any = req.query;
    try{
        if(!color){
            throw new Error('Debe completar los campos correctamente.');
        }else{
            const allProducts: Array<Product> = await ProductModel.find({}).populate("stock");
                if(allProducts){
                const allProductsMapped:any = allProducts.map((el:any)=>{
                    let product;
                    el.stock.stock.forEach((stockeado:any)=>{
                        for(let property in stockeado[0]){
                            if(property === color && (stockeado[0][property].xs >0 || stockeado[0][property].s >0 || stockeado[0][property].m >0 || stockeado[0][property].l >0 || stockeado[0][property].xl >0 || stockeado[0][property].xxl >0)){
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
        }catch(err:any | unknown){
            res.status(400).send(`Error en controller GET_PRODUCT_BY_COLOR: ${err.message}`);
    }
}