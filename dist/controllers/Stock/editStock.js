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
exports.EDIT_STOCK = void 0;
const Stock_1 = require("../../models/Stock");
const EDIT_STOCK = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, stock } = req.body;
    try {
        if (!_id || !stock || !name) {
            throw new Error('Especifique el id del stock que quiere editar');
        }
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
        let resultado = hare.reduce((valorAnterior, valorActual) => {
            for (let property2 in valorActual[0]) {
                if (property2 !== 'all' && valorActual[0][property2][`stock_${property2}`] !== 0) {
                    return valorActual[0][property2][`stock_${property2}`] + valorAnterior;
                }
            }
            return valorAnterior;
        }, 0);
        let final = hare.map((element) => {
            for (let property in element[0]) {
                if (property === 'all') {
                    return element[0][property] = [{ [property]: resultado }];
                }
                else {
                    return element;
                }
            }
        });
        const oldStock = yield Stock_1.StockModel.updateOne({ name: name }, {
            name: name && name,
            stock: final && final
        });
        if (oldStock) {
            res.status(200).json(oldStock);
        }
        else {
            throw new Error('Ningun stock fue modificado, revise los datos');
        }
    }
    catch (err) {
        res.status(400).send(`Error en el controller EDIT_STOCK: ${err}`);
    }
});
exports.EDIT_STOCK = EDIT_STOCK;
