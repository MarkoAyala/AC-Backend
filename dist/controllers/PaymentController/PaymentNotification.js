"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENT_NOTIFICATION = void 0;
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const nodemailer_1 = require("../../nodemailer");
const axios_1 = __importDefault(require("axios"));
const getPayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let info = yield axios_1.default.get(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return info.data;
});
const PAYMENT_NOTIFICATION = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const { id, topic } = req.query;
        if (id && topic === 'payment') {
            let payment = yield getPayment(id);
            if (payment.status === 'approved') {
                nodemailer_1.transporter.sendMail({
                    from: '"ALTO CUERO - Información de contacto" <markoayala147@gmail.com>',
                    to: (_a = payment.additional_info) === null || _a === void 0 ? void 0 : _a.payer.last_name,
                    subject: `Gracias por tu compra ${(_b = payment.additional_info) === null || _b === void 0 ? void 0 : _b.payer.first_name} 🧡`,
                    html: `
            <div style={{width:'100%', backgroundColor:'#242424', color:'white', overflow:'hidden'}}>
                        <div style={{width:'100%', display:'flex'}}>

                        <img src="https://res.cloudinary.com/morgan22/image/upload/v1665506332/AltoCuero/banner_kauugt.png" alt="no img" style={{width:'95%', height:'150px', objectFit:'cover', margin:'0px auto 0px auto', borderRadius:'7px'}} />
                        </div>
                        <h3 style={{textAlign:'center', margin:'15px 0px'}}>Gracias por confiar en nosotros,${(_c = payment.additional_info) === null || _c === void 0 ? void 0 : _c.payer.first_name}</h3>
                        <div style={{margin:'0px 20px', border:'2px solid #555', padding:'20px 10px'}}>
                            <p>Para mantenernos en contacto, mandanos un mensaje para avisarnos de la compra enviando el codigo del comprobante de pago <span style={{border:'1px solid gray', padding:'0px 15px', backgroundColor:'#060606'}}>${id}</span> para acelerar el proceso a este numero de WhatsApp: https://api.whatsapp.com/send?phone=541170995410 </p>
                            <h4 style={{marginTop:'10px'}}>Los datos del envio son los siguientes:</h4>
                            <ul style={{marginLeft:'30px'}}>
                                <li> <span style={{borderBottom:'2px solid #555'}}>Calle:</span> ${(_d = payment.additional_info) === null || _d === void 0 ? void 0 : _d.payer.address.street_name}</li>
                                <li> <span style={{borderBottom:'2px solid #555'}}>Numeración:</span> ${(_e = payment.additional_info) === null || _e === void 0 ? void 0 : _e.payer.address.street_number}</li>
                                <li> <span style={{borderBottom:'2px solid #555'}}>C.Postal:</span> ${(_f = payment.additional_info) === null || _f === void 0 ? void 0 : _f.payer.address.zip_code}</li>
                            </ul>
                            <h4 style={{color:'#ffb100', margin:'10px 0px 0px 0px'}}>En caso de que alguno de estos datos sean erroneos o quieras darnos mas detalles sobre el envio porfavor cumunicate con nosotros lo antes posible.</h4>
                            <h4 style={{color:'rgb(87 177 255)', margin:'10px 0px 0px 0px', textAlign:'center'}}>Tu mensaje no es molestia 🙂</h4>
                        </div>
            </div>
            `,
                }).then((response) => {
                    if (response.accepted[0]) {
                        console.log('Mail enviado');
                    }
                    else {
                        throw new Error('No se envio a ningun email');
                    }
                });
                res.status(201).json({ email: 'terminado' });
            }
            else {
                throw new Error('No se aprobo el pago todavia');
            }
        }
        else {
            res.status(201).json({ msg: 'enPROCESO' });
        }
    }
    catch (error) {
        res.status(400).json(`Error en el controller PAYMENT : ${error}`);
    }
});
exports.PAYMENT_NOTIFICATION = PAYMENT_NOTIFICATION;
