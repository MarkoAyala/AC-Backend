require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import axios from "axios";





export const PAYMENT_NOTIFICATION = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
   /* let info = await axios.get(`https://api.mercadopago.com/v1/payments/50004152897`) */
   console.log("query",req.query);
   res.status(200).json(req.query);
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};