import { NextFunction, Request, Response } from "express";
import { StockModel } from "../../models/Stock";


export const EDIT_STOCK = async (
    req:Request,
    res:Response,
    _next:NextFunction
) => {
    const { _id , name , stock} = req.body;
    try {
        if(!_id || !stock || !name){
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
        let resultado = hare.reduce((valorAnterior:any , valorActual:any)=>{
            for(let property2 in valorActual[0]){
                if(property2 !== 'all' && valorActual[0][property2][`stock_${property2}`] !== 0){
                    return valorActual[0][property2][`stock_${property2}`] + valorAnterior
                }
            }
            return valorAnterior
        },0)
        
        let final = hare.map((element:any)=>{
            for(let property in element[0]){
                if(property === 'all'){
                    return element[0][property] = [{[property]:resultado}]
                }else{
                    return element
                }
            }
        })
        const oldStock = await StockModel.updateOne({name:name},{
            name: name && name,
            stock: final && final
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