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
       transporter.sendMail({
            from: '"ALTO CUERO - Información de contacto" <markoayala147@gmail.com>', 
            to: payment.additional_info?.payer.last_name, 
            subject: `Gracias por tu compra ${payment.additional_info?.payer.first_name} 🧡`,
            html: `
            <div style={{width:'100%', backgroundColor:'#242424', color:'white', overflow:'hidden'}}>
                        <div style={{width:'100%', display:'flex'}}>

                        <img src={Banner} alt="no img" style={{width:'95%', height:'150px', objectFit:'cover', margin:'0px auto 0px auto', borderRadius:'7px'}} />
                        </div>
                        <h3 style={{textAlign:'center', margin:'15px 0px'}}>Gracias por confiar en nosotros,${payment.additional_info?.payer.first_name}</h3>
                        <div style={{margin:'0px 20px', border:'2px solid #555', padding:'20px 10px'}}>
                            <p>Para mantenernos en contacto, mandanos un mensaje para avisarnos de la compra enviando el codigo del comprobante de pago <span style={{border:'1px solid gray', padding:'0px 15px', backgroundColor:'#060606'}}>${id}</span> para acelerar el proceso a este numero de WhatsApp: +54 1170995411 </p>
                            <h4 style={{marginTop:'10px'}}>Los datos del envio son los siguientes:</h4>
                            <ul style={{marginLeft:'30px'}}>
                                <li> <span style={{borderBottom:'2px solid #555'}}>Calle:</span> ${payment.additional_info?.payer.address.street_name}</li>
                                <li> <span style={{borderBottom:'2px solid #555'}}>Numeración:</span> ${payment.additional_info?.payer.address.street_number}</li>
                                <li> <span style={{borderBottom:'2px solid #555'}}>C.Postal:</span> ${payment.additional_info?.payer.address.zip_code}</li>
                            </ul>
                            <h4 style={{color:'#ffb100', margin:'10px 0px 0px 0px'}}>En caso de que alguno de estos datos sean erroneos o quieras darnos mas detalles sobre el envio porfavor cumunicate con nosotros lo antes posible.</h4>
                            <h4 style={{color:'rgb(87 177 255)', margin:'10px 0px 0px 0px', textAlign:'center'}}>Tu mensaje no es molestia 🙂</h4>
                        </div>
            </div>
            
            `,
          }).then((response)=>{
            if(response.accepted[0]){
              res.status(201).json({email:'terminado'});
            }else{
              throw new Error('No se envio a ningun email');
            }
          }); 
      }else{
        throw new Error('No se aprobo el pago todavia');
      }
    }else{
       res.status(201).json({msg:'enPROCESO'});
    }
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller PAYMENT : ${error}`);
  }
};