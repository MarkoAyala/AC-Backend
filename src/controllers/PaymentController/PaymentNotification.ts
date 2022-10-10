require("dotenv").config();
const {ACCESS_TOKEN} = process.env;
import { NextFunction, Request, Response } from "express";
import { transporter } from "../../nodemailer";
import axios from "axios"; 

const getPayment = async (id:any) => {
  let info = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`,
  {
    headers:{
      Authorization: `Bearer ${ACCESS_TOKEN}`
    }
  })
  return info.data
}



export const PAYMENT_NOTIFICATION = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const {id , topic} = req.query;
    if(id && topic === 'payment'){
      let payment = await getPayment(id);
      if(payment.status === 'approved'){
       const email = await (transporter.sendMail({
            from: '"ALTO CUERO - Información de contacto" <markoayala147@gmail.com>', 
            to: payment.additional_info?.payer.last_name, 
            subject: `Gracias por tu compra ${payment.additional_info?.payer.first_name} 🧡`,
            html: `<div style={{margin:20px auto}}>   <p>Hola !! , nos comunicamos para decirte que tu compra fue exitosa. A continuación te brindamos informacion nuestra para que estes en contacto:</p></br><p>Escribinos a nuestro WhatsApp con tu ID de compra para acelerar el proceso y poder hacer el envio lo antes posible --> ID: , nuestro whatsapp:+54 11700995411. Muchas gracias por tu compra <3!</p>                </div>`, // html body
          }));
          console.log('AAAAAAAAAAAAAA', email);
          res.status(201).json({email});
      }
        res.status(201).json({no:"nocreado"});
    }else{
        console.log('NO ENTRE A PAYMENT', req.query, req.query.data)
       res.status(201).json({msg:'enPROCESO'});
    }
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};