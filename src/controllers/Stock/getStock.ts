import { NextFunction, Request, Response } from "express";
import { Stock, StockModel } from "../../models/Stock";
import {StockMapped} from '../../interfaces/Stock';

export const GET_STOCK = async (
    _req:Request,
    res:Response,
    _next:NextFunction
) => {
    try{
        const allStock:Array<Stock> = await StockModel.find({});
        if(allStock){
            const allStockMapped:Array<StockMapped>= allStock.map((el:any)=>{
                return ({
                    _id:el._id,
                    name:el.name,
                    stock:el.stock
                });
            })
            res.status(200).json(allStockMapped);
        }
    }catch(err:any|unknown){
        res.status(400).send(`Error en el controler GET_STOCK: ${err}`);
    }
}