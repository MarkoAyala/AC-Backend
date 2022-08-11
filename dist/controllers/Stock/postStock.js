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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATE_STOCK = void 0;
const Stock_1 = require("../../models/Stock");
const CREATE_STOCK = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, stock } = req.body;
        if (!name || !stock) {
            throw new Error("Debe completar todos los campos.");
        }
        else {
            const existStock = yield Stock_1.StockModel.findOne({ name: name });
            if (existStock) {
                throw new Error(`Este stock ya existe:${existStock}`);
            }
            else {
                let hare = stock.map((element) => {
                    for (let property in element[0]) {
                        if (property !== 'all') {
                            return element[0][property] = [{ [property]: Object.assign(Object.assign({}, element[0][property]), { [`stock_${property}`]: element[0][property].xs + element[0][property].s + element[0][property].m + element[0][property].l + element[0][property].xl + element[0][property].xxl }) }];
                        }
                        else {
                            return element;
                        }
                    }
                });
                const number = hare[0][0].black.stock_black + hare[1][0].white.stock_white + hare[2][0].beige.stock_beige + hare[3][0].gray.stock_gray + hare[4][0].french_blue.stock_french_blue + hare[5][0].navy_blue.stock_navy_blue + hare[6][0].blue.stock_blue + hare[7][0].silver.stock_silver + hare[8][0].chalk.stock_chalk + hare[9][0].yellow.stock_yellow + hare[10][0].golden.stock_golden + hare[11][0].brown.stock_brown + hare[12][0].havana_brown.stock_havana_brown + hare[13][0].brown_sole.stock_brown_sole + hare[14][0].coffee_brown.stock_coffee_brown + hare[15][0].board.stock_board + hare[16][0].red.stock_red + hare[17][0].green.stock_green + hare[18][0].dark_green.stock_dark_green + hare[19][0].light_green.stock_light_green + hare[20][0].mint_green.stock_mint_green + hare[21][0].olive_green.stock_olive_green + hare[22][0].cherry.stock_cherry + hare[23][0].fuchsia.stock_fuchsia + hare[24][0].purple.stock_purple + hare[25][0].copper.stock_copper + hare[26][0].camel.stock_camel + hare[27][0].turquoise.stock_turquoise;
                hare[28][0].all = number;
                const createStock = {
                    name: name,
                    stock: hare
                };
                const created = yield Stock_1.StockModel.create(createStock);
                if (created) {
                    res.status(200).json(created);
                }
                else {
                    throw new Error("No se pudo crear el stock");
                }
            }
        }
    }
    catch (err) {
        res.status(400).json(`Error en el controler CREATE_STOCK:${err.messagge}`);
    }
});
exports.CREATE_STOCK = CREATE_STOCK;
