require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { transporter } from "../../nodemailer";
import axios from "axios"; 





export const PAYMENT_NOTIFICATION = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const {id , topic } = req.query
    let info:any;
    let resultado:any;
    if(id){//cambiar a merchant
      console.log("entre")
      info = await(await axios.get(`https://api.mercadopago.com/v1/payments/${id}`)).data
        resultado = await transporter.sendMail({
          from: '"ALTO CUERO - Información de contacto" <markoayala147@gmail.com>', 
          to: `${info.payer.last_name}`, 
          subject: "Gracias por tu compra 🧡",
          html: `<div style={{margin:20px auto}}>   <p>Hola ${info.payer.first_name}!! , nos comunicamos para decirte que tu compra fue exitosa. A continuación te brindamos informacion nuestra para que estes en contacto:</p></br><p>Escribinos a nuestro WhatsApp con tu ID de compra para acelerar el proceso y poder hacer el envio lo antes posible --> ID: ${id}, nuestro whatsapp:+54 11700995411. Muchas gracias por tu compra <3!</p>                </div>`, // html body
        });
    }
    console.log("INFO", info); // probar si sale que fue aprobado
    console.log("RESULTADO", resultado);
    console.log("id",typeof id , id);
   res.status(200).json(resultado);
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};