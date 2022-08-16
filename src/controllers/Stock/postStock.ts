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
        
                const createStock = {
                    name:name,
                    stock:final
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