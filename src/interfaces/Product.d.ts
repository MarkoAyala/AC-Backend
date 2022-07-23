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
    stock:number
    color:Array<String>
    url:Url
    tags:Array<String>
}