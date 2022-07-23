import { NextFunction, Request, Response } from "express";
import {ProductModel , Product} from "../../models/Product";
import { ProductMapped } from "../../interfaces/Product";

export const GET_PRODUCT = async (
    _req: Request,
    res: Response,
    _next: NextFunction
    ) => {
        //if (req.query.email || req.query.user_name || req.params.id) next();
       // else{
            try{
                const allProducts: Array<Product> = await ProductModel.find({});

                if(allProducts){
                    const allProductsMapped: Array<ProductMapped> = allProducts.map((el:any)=>{
                        return ({
                            _id: el._id,
                            name:el.name,
                            price:el.price,
                            stock:el.stock,
                            color:el.color.map((e:string)=>{return e}),
                            url:el.url,
                            tags:el.tags.map((e:string)=>{return e}),
                        });
                    });
                    res.status(200).json(allProductsMapped);
                }
            }catch(err:any | unknown){
                res.status(400).send(`Error en controller GET_USER: ${err.message}`);
            }
     //   }
    }