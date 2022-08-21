import { NextFunction, Request, Response } from "express";
import {ProductModel , Product} from "../../models/Product";
//import { ProductMapped } from "../../interfaces/Product";


export const GET_PRODUCT_BY_SIZE = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
     if (req.query.size && req.query.color) next();
    else{
        const {size}:any = req.query;
    try{
        if(!size){
            throw new Error('Debe completar los campos correctamente.');
        }else{
            const allProducts: Array<Product> = await ProductModel.find({}).populate("stock");
                if(allProducts){
                const allProductsMapped:any = allProducts.map((el:any)=>{
                    let product;
                    el.stock.stock.forEach((stockeado:any)=>{
                        for(let property in stockeado[0]){
                            if(stockeado[0][property][size]>0){
                                product =  true
                            }
                        }
                    })
                    console.log(product)
                    if(product === true){
                        console.log('entra?')
                        return ({
                                _id: el._id,
                                name:el.name,
                                price:el.price,
                                stock:el.stock,
                                url:el.url,
                                description:el.description,
                                tags:el.tags.map((e:string)=>{return e}),
                                 });
                    }
                    });
                    res.status(200).json(allProductsMapped);
                }
        }
        }catch(err:any | unknown){
            res.status(400).send(`Error en controller GET_USER: ${err.message}`);
    }
    }
}