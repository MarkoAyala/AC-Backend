import { NextFunction, Request, Response } from "express";
import { StockModel } from "../../models/Stock";
import {StockMapped} from '../../interfaces/Stock';


export const CREATE_STOCK = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    try{
     const {name , stock}: StockMapped = req.body;
        if(!name || !stock){
            throw new Error ("Debe completar todos los campos.");
        }else{
            const existStock = await StockModel.findOne({name:name});
            if(existStock){
                throw new Error(`Este stock ya existe:${existStock}`);
            }else{
                const createStock = {
                    name:name,
                    stock:stock
                }
                const created = await StockModel.create(createStock);
                if(created){
                    res.status(200).json(created);
                }else{
                    throw new Error("No se pudo crear el stock");
                }
            }
        }
    }catch(err:string|any){
        res.status(400).json(`Error en el controler CREATE_STOCK:${err.messagge}`)
    }
  }