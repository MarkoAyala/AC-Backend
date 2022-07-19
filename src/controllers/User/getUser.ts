import { NextFunction, Request, Response } from "express";
import {UserModel , User} from "../../models/User";
import { UserMapped } from "../../interfaces/User";

export const GET_USER = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        const { firstName , nickname} = req.body;
        if (!firstName || !nickname) next();
        else{
            try{
                const allUsers: Array<User> = await UserModel.find({}).populate("shoppingCart")
                console.log("ENTRE ACA Y NO DEBIA LOCO")
                if(allUsers){
                    const allUsersMapped: Array<UserMapped> = allUsers.map((el:any)=>{
                        return ({
                            _id: el._id,
                            firstName:el.firstName,
                            lastName:el.lastName,
                            nickname: el.nickname,
                            email:el.email,
                            picture:el.picture,
                            role:el.role,
                            country:el.country,
                            shoppingCart:el.shoppingCart,
                            favorites:el.favorites

                        });
                    });
                    res.status(200).json(allUsersMapped);
                }
            }catch(err:any | unknown){
                res.status(400).send(`Error en controller GET_USER: ${err.message}`);
            }
       }
    }