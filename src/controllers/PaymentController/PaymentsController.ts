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
                title:'Dummy lolazo',
                currency_id: "ARS",
                description:'Dummy description asdfsadfas fasf sasa saasfsaf',
                picture_url:'https://earlygame.com/uploads/images/_800x418_crop_center-center_82_none/League-of-Legends-Thumpnail.jpg?mtime=1588244867',
                category_id:'art',
                quantity:1,
                unit_price:20
            }
        ],
        back_urls:{
            success:"http://localhost:3001/payment/info",
            failure:"http://www.failure.com",
            pending:"http://www.pending.com"
        },
        auto_return: "approved",
        payer: {
            name: "Juan",
            surname: "Lopez",
            mail: "lorenzo@hotmail.com",
            phone: {
                area_code: "11",
                number: "4444-4444"
            },
            identification: {
                type: "DNI",
                number: "12345678"
            },
            address: {
                street_name: "Street",
                street_number: 123,
                zip_code: "5700"
            }
        },
        excluded_payment_types: [
            {
                id: "ticket"
            }
        ],
        notification_url: "https://altocuero-backend.onrender.com/payment/info",
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