import { NextFunction, Request, Response } from "express";
import UserModel from "../../models/User";
import { UserMapped } from "../../interfaces/User";

export const CREATE_USER = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      country,
    }: UserMapped = req.body;

    if (!firstName || !lastName || !email || !password || !role || !country || !userName) {
      throw new Error("Debe completar todos los campos.");
    } else {
      const existUserName = await UserModel.findOne({ userName: userName });
      if (existUserName) {
        throw new Error(`Ya existe este nombre de usuario: ${existUserName}`);
      } else {
        const createUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
          country: country,
        };
        const created = await UserModel.create(createUser);
        if (created) {
          res.status(200).json(created);
        } else {
          throw new Error("No se pudo crear el usuario");
        }
      }
    }
  } catch (error: string | any) {
    res.status(400).json(`Error en el controller CREATE_USER: ${error.mesagge}`);
  }
};
