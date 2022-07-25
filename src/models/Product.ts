import {prop , getModelForClass , Ref} from '@typegoose/typegoose';
import { Url } from '../interfaces/Product';
import {Stock} from './Stock';

export class Product{
    @prop({required:true, trim:true})
    name:string

    @prop({default:0})
    price:number;

    @prop({ref:()=> Stock ,required:true, trim:true})
    stock:Ref<Stock>

    @prop({required:true ,  lowercase:true})
    url:Url

    @prop({required:true})
    description:string

    @prop({ type:()=> [String] ,required:true})
    tags:string[]
}



export const ProductModel = getModelForClass(Product);