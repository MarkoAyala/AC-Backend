import { ProductModel } from "../../models/Product";
import { destroyMultimedia } from "../../cloudinary";
import { Request, Response } from "express";


export const DELETE_PRODUCT = async (req: Request, res: Response) => {
    const { _id ,url }:any = req.body;
    console.log(_id , url)
  try {
    if (!_id || !url) {
      throw new Error("The id entered is undefined or null, please try again.");
    } else {
      const deletedProduct = await ProductModel.deleteOne({ _id: _id });
      if (deletedProduct.deletedCount) {
        for(let property in url){
          let index = url[property].indexOf('/AltoCuero');
          let latest = url[property].indexOf('.png');
          let latest1 = url[property].indexOf('.jpg');
          let latest2 = url[property].indexOf('.jpeg');
          let final = url[property].substring(index+11,latest !== -1?latest:latest1 !== -1?latest1:latest2 !== -1?latest2:null);
          await destroyMultimedia(`AltoCuero/${final}`)
        } 
        res.status(200).json(`${deletedProduct.deletedCount} ha sido eliminado`); 
      } else {
        throw new Error(`${deletedProduct.deletedCount} have been matched with the id entered, please check the id entered.`);
      }
     }
    }catch (err: string | any) {
    res.status(400).json(`An error has been ocurred in controller DELETE_COMMENT: ${err.message}`);
  }
};

//_id:"632398075ee81d0020f43e1c",
//"url": {
//    "img1": "https://res.cloudinary.com/morgan22/image/upload/v1663277053/AltoCuero/g0ft32q4j1glnofal14c.png"
//  },