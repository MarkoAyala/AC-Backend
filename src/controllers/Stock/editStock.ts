import { NextFunction, Request, Response } from "express";
import { StockModel } from "../../models/Stock";


export const EDIT_STOCK = async (
    req:Request,
    res:Response,
    _next:NextFunction
) => {
    const { _id , name , stock} = req.body;
    try {
        if(!_id || !stock){
            throw new Error('Especifique el id del stock que quiere editar');
        }
        let hare = stock.map((element:any)=>{
            for(let property in element[0]){
                if(property !== 'all'){
                    return element[0][property] =[{[property]:{...element[0][property], [`stock_${property}`]:element[0][property].xs + element[0][property].s + element[0][property].m + element[0][property].l + element[0][property].xl + element[0][property].xxl}}]
                }else{
                    return element
                }
            }
        })
        const number = hare[0][0].black.stock_black + hare[1][0].white.stock_white + hare[2][0].beige.stock_beige + hare[3][0].gray.stock_gray + hare[4][0].french_blue.stock_french_blue + hare[5][0].navy_blue.stock_navy_blue + hare[6][0].blue.stock_blue + hare[7][0].silver.stock_silver + hare[8][0].chalk.stock_chalk + hare[9][0].yellow.stock_yellow + hare[10][0].golden.stock_golden + hare[11][0].brown.stock_brown + hare[12][0].havana_brown.stock_havana_brown + hare[13][0].brown_sole.stock_brown_sole + hare[14][0].coffee_brown.stock_coffee_brown + hare[15][0].board.stock_board + hare[16][0].red.stock_red + hare[17][0].green.stock_green + hare[18][0].dark_green.stock_dark_green + hare[19][0].light_green.stock_light_green + hare[20][0].mint_green.stock_mint_green + hare[21][0].olive_green.stock_olive_green + hare[22][0].cherry.stock_cherry + hare[23][0].fuchsia.stock_fuchsia + hare[24][0].purple.stock_purple + hare[25][0].copper.stock_copper + hare[26][0].camel.stock_camel + hare[27][0].turquoise.stock_turquoise
        hare[28][0].all = number
        const oldStock = await StockModel.updateOne({_id:_id},{
            name: name && name,
            stock: hare && hare
        });
        if(oldStock){
            res.status(200).json(oldStock);
        }else{
            throw new Error('Ningun stock fue modificado, revise los datos');
        }
    }catch(err:string | any){
        res.status(400).send(`Error en el controller EDIT_STOCK: ${err}`);
    }
}