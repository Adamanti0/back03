import { Request, Response } from 'express';
import sequelize from '../db/connection';
import { QueryTypes } from 'sequelize';

export const getQuery = async (req: Request, res: Response) => {
   const{query}=req.params;
   const consulta = `${query}`;
   ListarTabla(consulta,res);
}
export const getAll = async (req: Request, res: Response) => {
   const{esquema, objeto}=req.params;
   const consulta = `select*from ${esquema}.${objeto}`;
   ListarTabla(consulta,res);
}
export const getWhere = async (req: Request, res: Response) => {
   const{esquema, objeto, condicion}=req.params;
   const consulta = `select*from ${esquema}.${objeto} where ${condicion}`;
   ListarTabla(consulta,res);
}
export const getColumn = async (req: Request, res: Response) => {
   const{esquema, objeto, column, valor}=req.params;
   const consulta = `select*from ${esquema}.${objeto} where ${column}::text='${valor}'`;
   ListarTabla(consulta,res);
}
const ListarTabla = async(consulta:string,res:Response) => {
   try {
      const lista = await sequelize.query(consulta, { type: QueryTypes.SELECT });
      if(lista.length > 0)
         res.json(lista);
      else
         res.json({msg:`La consulta ${consulta} no devolvio registros`});
   } catch (error) {
      res.json({msg:error});
   }
}
export const getFunction = async (req: Request, res: Response) => {
   const{esquema, funcion}=req.params;
   try{
      const respuesta: { [key: string]: string }[] = await sequelize.query(
         `select*from ${esquema}.${funcion}()`,
         { type: QueryTypes.SELECT }
      );
      const lista = await sequelize.query(
            respuesta[0][funcion],
            { type: QueryTypes.SELECT }
      );
      if(lista.length > 0)
         res.json(lista);
      else
         res.status(404).json({msg:`La consulta select*from ${esquema}.${funcion}() no devolvio registros`});
   }catch(error){
      res.json({msg:error});
  }
}
export const getApiestado = async (req: Request, res: Response) => {
   const{esquema, objeto, apiestado, usumod, condicion}=req.params;
   try{
      const lista = await sequelize.query(
         `UPDATE ${esquema}.${objeto} SET apiestado=upper('${apiestado}'), usumod='${usumod}', fecmod=now() WHERE ${condicion}`,
         { type: QueryTypes.SELECT }
      );
      res.json({msg:`El estado del registro se modifico a ${apiestado}`});
   }catch(error){
      res.json({msg:error});
  }
}