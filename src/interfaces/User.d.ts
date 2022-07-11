import { Product } from "../models/Product"
import { User } from "../models/User"

export interface UserWithId extends User {
  _id: string
}

export interface UserMapped {
    _id:string
    firstName:string
    lastName:string
    nickname:string
    picture:string
    email:string
    role:number
    country:string
    shoppingCart?:Array<Product> | []
}