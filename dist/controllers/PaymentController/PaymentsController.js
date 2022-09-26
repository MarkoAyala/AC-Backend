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
exports.PAYMENT = void 0;
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const axios_1 = __importDefault(require("axios"));
const paymentFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = "http://api.mercadopago.com/checkout/preferences";
    const body = {
        payer_email: "test_user_15734346@testuser.com",
        items: [
            {
                tittle: 'Dummy Tittle',
                description: 'Dummy description',
                picture_url: 'https://www.mercadopago.com/org-img/MP3/home/logomp3.gif',
                category_id: 'cuero',
                quantity: 1,
                unit_price: 10
            }
        ],
        backs_urls: {
            succes: "https://www.success.com",
            failure: "http://www.failure.com",
            pending: "http://www.pending.com"
        },
        notification_url: "https://www.your-site.com/ipn"
    };
    const payment = yield axios_1.default.post(url, body, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    });
    return payment.data;
});
const PAYMENT = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pago = yield paymentFunction();
        return res.status(200).json(pago);
    }
    catch (error) {
        res.status(400).json(`Error en el controller PAYMENT : ${error}`);
    }
});
exports.PAYMENT = PAYMENT;
