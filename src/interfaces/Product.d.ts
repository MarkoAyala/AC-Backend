import { StockMapped } from "./Stock"
import { Product } from "../models/Product"

export interface Url{
    img1:string,
    img2?:string,
    img3?:string,
    img4?:string,
    img5?:string,
    img6?:string
}
export interface ProductMapped {
    _id:string
    name:string
    price:number
    stock:string
    url:Url
    description:string
    tags:Array<String>
}

export interface ProductWithStock {
    _id:string
    name:string
    price:number
    stock:StockMapped
    url:Url
    description:string
    tags:Array<String>
}