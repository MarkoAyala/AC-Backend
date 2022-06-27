import { Product } from "../models/Product"


export interface ProductMapped {
    _id:string
    name:string
    price:number
    stock:number
    color:Array<String>
    url:Array<String>
    tags:Array<String>
}