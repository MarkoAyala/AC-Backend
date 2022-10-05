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
const nodemailer_1 = require("../../nodemailer");
const axios_1 = __importDefault(require("axios"));
const PAYMENT_NOTIFICATION = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, topic } = req.query;
        let info;
        if (topic === 'payment') {
            info = yield (yield axios_1.default.get(`https://api.mercadopago.com/v1/payments/${id}`)).data;
            console.log(info);
            if (info) {
                yield nodemailer_1.transporter.sendMail({
                    from: '"ALTO CUERO - Información de contacto" <markoayala147@gmail.com>',
                    to: `${info.payer.last_name}, markoayala147@gmail.com`,
                    subject: "Gracias por tu compra 🧡",
                    text: "Hello world?",
                    html: `<div style={{margin:20px auto}}>   <p>Hola ${info.payer.first_name}!! , nos comunicamos para decirte que tu compra fue exitosa. A continuación te brindamos informacion nuestra para que estes en contacto:</p></br><p>Escribinos a nuestro WhatsApp con tu ID de compra para acelerar el proceso y poder hacer el envio lo antes posible --> ID: ${id}, nuestro whatsapp:+54 11700995411. Muchas gracias por tu compra <3!</p>                </div>`, // html body
                });
            }
        }
        res.status(200).json(info);
    }
    catch (error) {
        res.status(400).json(`Error en el controller PAYMENT : ${error}`);
    }
});
exports.PAYMENT_NOTIFICATION = PAYMENT_NOTIFICATION;
