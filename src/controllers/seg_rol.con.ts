import { Request, Response } from "express"
import { seg_rol } from './../models/seg_rol.mod';
import { Op, QueryTypes  } from "sequelize";
import sequelize from "../db/connection";
import jwt from 'jsonwebtoken';

export const postAll = async (req: Request, res: Response) => {
   const { body } = req;
   try {
      await seg_rol.create(body);
      res.json({msg: `Se creo el registro, en seg_rol`});
   } catch (error) {
      res.json({msg: error});
   }
}
export const postWhe = async (req: Request, res: Response) => {
   const { body } = req;
   const { condicion } = req.params;
   const consulta = `select*from ipp.seg_rol where ${condicion}`;
   functionPost(consulta, res, body);
}
export const postCol = async (req: Request, res: Response) => {
   const { body } = req;
   const { column, valor } = req.params;
   body [ column ] = valor;
   const consulta = `select*from ipp.seg_rol where ${column}::text='${valor}'`;
   functionPost(consulta, res, body);
}
const functionPost = async(consulta: string, res: Response, body: any) => {
   try {
      const registro = await sequelize.query(consulta, { type: QueryTypes.SELECT });
      if (registro.length > 0)
         return res.status(400).json({msg: `La consulta: ${consulta}, devuelve registros, no se pudo crear el registro en seg_rol`});
      await seg_rol.create(body);
      res.json({msg: `Se creo el registro, en seg_rol`});
   } catch (error) {
      res.json({msg: error});
   }
}
export const putPri = async (req: Request, res: Response) => {
   const { body } = req;
   const { id } = req.params;
   try {
      const registro = await seg_rol.findByPk(id);
      if (registro) {
         await registro.update(body);
         res.json({msg: `El registro fue actualizado en seg_rol`});
      } else
         res.status(404).json({msg:`No existe el registro con identificador ${id}, en seg_rol`});
   } catch (error) {
      res.json({msg: error});
   }
}
export const putCol = async (req: Request, res: Response) => {
   const { body } = req;
   const { column, valor } = req.params;
   try {
      body[column] = valor;
      const whereCondition = { [column]: valor };
      const registro = await seg_rol.findAll({ where: whereCondition });
      if (registro.length > 0) {
         await seg_rol.update(body, { where: whereCondition });
         res.json({ msg: 'Los registros fueron actualizados en seg_rol' });
      } else
         res.status(404).json({msg:`No existen registros que cumplan la condicion, en seg_rol`});
   } catch (error) {
      res.json({msg: error});
   }
}