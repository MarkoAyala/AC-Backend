import { NextFunction, Request, Response } from "express";
/* import { UserMapped } from "../../interfaces/User"; */
import { UserModel } from "../../models/User";

export const GET_USER_BY_EMAIL = async (req: Request, res: Response, _next: NextFunction) => {
    const {email, nickname} = req.query;
        try{
            if(email){
                const userByMail = await UserModel.findOneAndUpdate({
                    email:email, nickname:nickname
                },{
                    $setOnInsert:{hola:'me cree'}
                },
                {
                    returnOriginal: false,
                    upsert:true
                });
                res.status(200).json(userByMail);
            }else{
                res.status(400).send('No se encontrĂ³ el usuario requerido.,')
             }
            }catch(err: any | unknown){
                res.status(400).send(`Error en el controller GET_USER_BY_MAIL: ${err.message}`);
            }
    }
