import { NextFunction, Request, Response } from "express";
import {ProductModel} from "../../models/Product";
import { ProductMapped } from "../../interfaces/Product";
import { StockModel } from "../../models/Stock";

export const CREATE_PRODUCT = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const {
      name,
      price,
      stock,
      url,
      tags,
    }: ProductMapped = req.body;

    if (!name || !price || !stock || !url || !tags) {
      throw new Error("Debe completar todos los campos.");
    } else {
      const existProduct = await ProductModel.findOne({ name: name });
      if (existProduct) {
        throw new Error(`Ya existe este producto ${existProduct}`);
      } else {
        let color = `stock.${stock.color}.${stock.talle}`;
        const existStock = await StockModel.findOneAndUpdate({_id:stock._id},{$inc:{[color]:stock.increase}})
        if(!existStock){
          throw new Error('No se encontro el stock solicitado');
        }else{
          const createProduct = {
            name:name,
            price:price,
            stock:stock._id,
            url:url,
            tags:tags,
          };
          const created = await ProductModel.create(createProduct);
          if (created) {
            res.status(200).json(created);
          } else {
            throw new Error("No se pudo crear el producto");
          }
        }
      }
    }
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller CREATE_PRODUCT: ${error}`);
  }
};

/* Este controller crea un producto y actualiza el stock de 1 color de 1 talle */