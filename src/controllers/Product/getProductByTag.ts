import { NextFunction, Request, Response } from "express";
import {ProductModel , Product} from "../../models/Product";

export const GET_PRODUCT_BY_TAG = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        if (req.query.size || req.query.color) next();
       else{
            try{
                const {tags} = req.query ; 
                const allProducts: Array<Product> = await ProductModel.find({}).populate("stock");
                if(allProducts){
                    const allProductsMapped:any = allProducts.map((el:any)=>{
                        if(el.tags.includes(tags)){
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
                    const result = allProductsMapped.filter((e:any)=> e !== null)
                    res.status(200).json(result);
                }
            }catch(err:any | unknown){
                res.status(400).send(`Error en controller GET_USER_BY_TAG: ${err.message}`);
            }
        }
    }