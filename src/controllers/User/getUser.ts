import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/User";
import { UserMapped } from "../../interfaces/User";

export const GET_USER = async (
    req: Request,
    res: Response,
    _next: NextFunction
    ) => {
        //if (req.query.email || req.query.user_name || req.params.id) next();
    }