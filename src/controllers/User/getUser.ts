import { NextFunction, Request, Response } from "express";
import {UserModel , User} from "../../models/User";
import { UserMapped } from "../../interfaces/User";

export const GET_USER = async (
    _req: Request,
    res: Response,
    _next: NextFunction
    ) => {
        //if (req.query.email || req.query.user_name || req.params.id) next();
       // else{
            try{
                const allUsers: Array<User> = await UserModel.find({});

                if(allUsers){
                    const allUsersMapped: Array<UserMapped> = allUsers.map((el:any)=>{
                        return ({
                            _id: el._id,
                            firstName:el.firstName,
                            lastName:el.lastName,
                            userName: el.userName,
                            email:el.email,
                            password:el.password,
                            role:el.role,
                            country:el.country

                        });
                    });
                    res.status(200).json(allUsersMapped);
                }
            }catch(err:any | unknown){
                res.status(400).send(`Error en controller GET_USER: ${err.message}`);
            }
     //   }
    }