import { NextFunction, Request, Response } from "express";
import {ProductModel , Product} from "../../models/Product";
import { ProductMapped } from "../../interfaces/Product";

export const GET_PRODUCT = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        if (req.query.size || req.query.color) next();
       else{
            try{
                const allProducts: Array<Product> = await ProductModel.find({}).populate("stock");
                if(allProducts){
                    const allProductsMapped: Array<ProductMapped> = allProducts.map((el:any)=>{
                        return ({
                            _id: el._id,
                            name:el.name,
                            price:el.price,
                            stock:el.stock,
                            url:el.url,
                            description:el.description,
                            tags:el.tags.filter((e:string)=>e !== ''),
                        });
                    });
                    res.status(200).json(allProductsMapped);
                }
            }catch(err:any | unknown){
                res.status(400).send(`Error en controller GET_USER: ${err.message}`);
            }
        }
    }