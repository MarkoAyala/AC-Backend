import {prop , getModelForClass} from '@typegoose/typegoose';
import { Url } from '../interfaces/Product';

export class Product{
    @prop({required:true, trim:true})
    name:string

    @prop({default:0})
    price:number;

    @prop({required:true, trim:true})
    stock:number

    @prop({required:true , type:()=> [String]})
    color:string[]

    @prop({required:true , type:()=> [String] ,  lowercase:true})
    url:Url

    @prop({ type:()=> [String] ,required:true})
    tags:string[]
}



export const ProductModel = getModelForClass(Product);