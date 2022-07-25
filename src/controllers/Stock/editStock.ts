import { NextFunction, Request, Response } from "express";
import { StockModel } from "../../models/Stock";


export const EDIT_STOCK = async (
    req:Request,
    res:Response,
    _next:NextFunction
) => {
    const { id , name , stock} = req.body;
    try {
        if(!id){
            throw new Error('Especifique el id del stock que quiere editar');
        }
        const oldStock = await StockModel.updateOne({_id:id},{
            name: name && name,
            stock: stock && stock
        });
        if(oldStock){
            res.status(200).json(oldStock);
        }else{
            throw new Error('Ningun stock fue modificado, revise los datos');
        }
    }catch(err:string | any){
        res.status(400).send(`Error en el controller EDIT_STOCK: ${err}`);
    }
}