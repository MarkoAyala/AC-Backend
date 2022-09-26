require("dotenv").config();
import { NextFunction, Request, Response } from "express";
const {ACCESS_TOKEN} = process.env;
import axios from 'axios';

const paymentFunction = async ()=>{
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body ={
        payer_email:"test_user_15734346@testuser.com",
        items:[
            {
                title:'Dummy Tittle',
                currency_id: "ARS",
                description:'Dummy description asdfsadfas fasf sasa saasfsaf',
                picture_url:'https://res.cloudinary.com/morgan22/image/upload/v1661873541/AltoCuero/uh6gis1xhenieeasmv3l.png',
                category_id:'art',
                quantity:1,
                unit_price:20
            }
        ],
        back_urls:{
            success:"https://www.success.com",
            failure:"http://www.failure.com",
            pending:"http://www.pending.com"
        },
        notification_url:"https://altocuero-backend.onrender.com/payment/info",
        installments: 12
    };
    const payment = await axios.post(url, body,{
        headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${ACCESS_TOKEN}`
        }
    })
    console.log("AAAAAAAAAAAAAA",payment);
    return payment.data;
}



export const PAYMENT = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
   const pago = await paymentFunction();
   return res.status(200).json(pago);
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};