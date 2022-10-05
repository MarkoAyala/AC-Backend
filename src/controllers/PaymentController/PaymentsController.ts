require("dotenv").config();
import { Compra } from "../../interfaces/payment";
import { NextFunction, Request, Response } from "express";
const {ACCESS_TOKEN} = process.env;
import axios from 'axios';


export const PAYMENT = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
    try {
    const {name ,description , picture , price , nombre_comprador , email_comprador , codigo_de_area , celular ,dni , provincia , calle ,numeracion , codigo_postal, id_producto}:Compra= req.body;
   const pago = await paymentFunction({name:name , description:description , picture:picture , price:price , nombre_comprador:nombre_comprador ,email_comprador:email_comprador, codigo_de_area:codigo_de_area , celular:celular,dni:dni , provincia:provincia , calle:calle , numeracion:numeracion , codigo_postal:codigo_postal, id_producto:id_producto});
   console.log(pago);
   return res.status(200).json(pago);
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};


const paymentFunction = async (info:Compra)=>{
    console.log(info)
    const url = "https://api.mercadopago.com/checkout/preferences";
    const body ={
        payer_email:"test_user_15734346@testuser.com",
        items:[
            {
                title:info.name,
                currency_id: "ARS",
                description:info.description,
                picture_url:info.picture,
                category_id:'art',
                quantity:1,
                unit_price:info.price
            }
        ],
        back_urls:{
            success:`http://localhost:3001/payment/info?id_producto=${info.id_producto}`,
            failure:"http://www.failure.com",
            pending:"http://www.pending.com"
        },
        auto_return: "approved",
        payer: {
            name: info.nombre_comprador,
            surname: info.email_comprador,
            mail: info.email_comprador,
            phone: {
                area_code: info.codigo_de_area,
                number: info.celular
            },
            identification: {
                type: "DNI",
                number: info.dni
            },
            address: {
                street_name: info.calle,
                street_number: info.numeracion,
                zip_code:info.codigo_postal
            }
        },
        payment_methods:{
            excluded_payment_types: [
                {
                    id: "ticket"
                }
            ],
            installments: 12
        },
        statement_descriptor: "ALTO-CUERO",
        notification_url: `https://altocuero-backend.onrender.com/payment/info?id_producto=${info.id_producto}`,
    };
    const payment = await axios.post(url, body,{
        headers:{
            "Content-Type": "application/json",
            Authorization:`Bearer ${ACCESS_TOKEN}`
        }
    })
    return payment.data;
}