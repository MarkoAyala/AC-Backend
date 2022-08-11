import {prop , getModelForClass} from '@typegoose/typegoose';
import { StockInterface } from '../interfaces/Stock';


export class Stock{
    @prop({required:true, trim:true})
    name:string

    @prop({required:true ,  lowercase:true})
    stock:StockInterface
}


export const StockModel = getModelForClass(Stock);