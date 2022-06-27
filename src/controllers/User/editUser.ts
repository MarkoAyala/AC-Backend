import { NextFunction, Request, Response } from "express";
import {UserModel} from "../../models/User";


export const EDIT_USER = async (req: Request , res:Response , _next:NextFunction) => {
    try{
        const {
            id,
            firstName,
            lastName,
            userName,
            email,
            password,
            role,
            country,
            shoppingCart
          }= req.body;
          if(!id){
            throw new Error('Ha ocurrido un error al editar el usuario');
          }else{
            const userEdited = await UserModel.updateOne({_id:id},{
                firstName: firstName && firstName,
                lastName: lastName && lastName,
                userName: userName && userName,
                email: email && email,
                password: password && password,
                role: role && role,
                country: country && country,
                shoppingCart:shoppingCart && shoppingCart
            });

            res.status(200).json(userEdited)
          }
    }catch(err){
        throw new Error("No se ha encontrado un usuario existente con el id ingresado.");
    }
}
