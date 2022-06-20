import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/User";
import { UserMapped } from "../../interfaces/User";

export const GET_USER = async (
    req: Request,
    res: Response,
    _next: NextFunction
    ) => {
      const {firstName , lastName , email , password , role , country}:UserMapped = req.body
    try{
        const createUser = {firstName:firstName , lastName:lastName, email:email , password:password , role:role, country:country}
        const created = await UserModel.create(createUser)
        if(created){
            res.status(200).json(created);
        }else {
            throw new Error("No se pudo crear el usuario")
          }
    }catch(error){
        console.log("errorsaki", error)
    }
  }