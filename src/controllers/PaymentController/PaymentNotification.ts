require("dotenv").config();
const {ACCESS_TOKEN} = process.env;
import { NextFunction, Request, Response } from "express";
import { transporter } from "../../nodemailer";
import axios from "axios"; 

const getPayment = (id:string) => {
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
    const {id , topic, data} = req.query;
    if(id && topic === 'payment'){
      console.log("entre");
      console.log(data, "orden?")
      let payment = await getPayment(id);
      console.log(payment)
        resultado = await transporter.sendMail({
          from: '"ALTO CUERO - Información de contacto" <markoayala147@gmail.com>', 
          to: `markoayala3@hotmail.com`, 
          subject: "Gracias por tu compra 🧡",
          html: `<div style={{margin:20px auto}}>   <p>Hola !! , nos comunicamos para decirte que tu compra fue exitosa. A continuación te brindamos informacion nuestra para que estes en contacto:</p></br><p>Escribinos a nuestro WhatsApp con tu ID de compra para acelerar el proceso y poder hacer el envio lo antes posible --> ID: , nuestro whatsapp:+54 11700995411. Muchas gracias por tu compra <3!</p>                </div>`, // html body
        });
        res.status(200).json(payment);
    }else{
       res.status(200).json(req.query.topic);
    }
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};