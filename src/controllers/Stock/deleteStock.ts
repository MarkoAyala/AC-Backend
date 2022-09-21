import { StockModel } from "../../models/Stock";
import { ProductModel } from "../../models/Product";
import { Request, Response } from "express";


export const DELETE_STOCK = async (req: Request, res: Response) => {
    const { _id }:any = req.query;
  try {
    if (!_id) {
      throw new Error("No existe un id");
    } else {
      const stockMapped = await ProductModel.find({}).populate("stock");
      if(stockMapped){
        const exist = stockMapped.filter((element:any)=>element.stock._id.toString() === _id);
        if(exist[0]){
          res.status(200).json({eliminado:false,productos:exist}); 
        }else{
          const deletedStock = await StockModel.deleteOne({ _id: _id });
          if(deletedStock.deletedCount){
            res.status(200).json({eliminado:true,productos:[]}); 
          }else {
            throw new Error(`${deletedStock.deletedCount} error en el controller delete stock no pudo eliminar`);
          } 
        }
      }
     }
    }catch (err: string | any) {
    res.status(400).json(`An error has been ocurred in controller DELETE_COMMENT: ${err.message}`);
  }
};