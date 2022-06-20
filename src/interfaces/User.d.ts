import { User } from "../models/User"

export interface UserWithId extends User {
  _id: string
}

export interface UserMapped {
    firstName:string
    lastName:string
    email:string
    password:string
    role:number
    country:string
}