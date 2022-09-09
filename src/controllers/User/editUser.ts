import { NextFunction, Request, Response } from "express";
import {UserModel} from "../../models/User";


export const EDIT_USER = async (req: Request , res:Response , _next:NextFunction) => {
    try{
        const {
            _id,
            firstName,
            lastName,
            nickname,
            email,
            picture,
            role,
            country,
            shoppingCart,
            favorites
          }= req.body;
          if(!_id){
            throw new Error('Ha ocurrido un error al editar el usuario');
          }else{
            const userEdited = await UserModel.updateOne({_id:_id},{
                firstName: firstName && firstName,
                lastName: lastName && lastName,
                nickname: nickname && nickname,
                picture:picture && picture,
                email: email && email,
                role: role && role,
                country: country && country,
                shoppingCart:shoppingCart && shoppingCart,
                favorites:favorites && favorites
            });

            res.status(200).json(userEdited)
          }
    }catch(err){
        throw new Error("No se ha encontrado un usuario existente con el id ingresado.");
    }
}
