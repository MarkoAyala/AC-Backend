import { NextFunction, Request, Response } from "express";
import { StockModel } from "../../models/Stock";


export const EDIT_STOCK = async (
    req:Request,
    res:Response,
    _next:NextFunction
) => {
    const { _id , name , stock} = req.body;
    try {
        if(!_id || !stock){
            throw new Error('Especifique el id del stock que quiere editar');
        }
        let hare = stock.map((element:any)=>{
            for(let property in element[0]){
                if(property !== 'all'){
                    return element[0][property] =[{[property]:{...element[0][property], [`stock_${property}`]:element[0][property].xs + element[0][property].s + element[0][property].m + element[0][property].l + element[0][property].xl + element[0][property].xxl}}]
                }else{
                    return element
                }
            }
        })
        const number = hare[0][0].red.stock_red + hare[1][0].yellow.stock_yellow
        hare[2][0].all = number
        const oldStock = await StockModel.updateOne({_id:_id},{
            name: name && name,
            stock: hare && hare
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