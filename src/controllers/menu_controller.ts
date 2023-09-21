import { Request, Response } from "express"
import { Op, QueryTypes  } from "sequelize";
import sequelize from "../db/connection";

export const getPadres = async (req: Request, res: Response) => {
   const{id_rol}=req.params;
   const consulta = `select p.id_pagina,p.id_pagina_padre,icono,enlace,nombre
                       from ipp.seg_rolpagina rp,ipp.seg_pagina p 
                      where rp.id_pagina=p.id_pagina and rp.apiestado='ELABORADO' and p.apiestado='ELABORADO' and rp.id_rol=${id_rol} and p.id_pagina_padre=0 and enlace is null order by p.orden`;
   Listar(consulta,res);
}
export const getHijos = async (req: Request, res: Response) => {
   const{id_rol, id_pagina_padre}=req.params;
   const consulta = `select p.id_pagina,p.id_pagina_padre,icono,enlace,nombre
                       from ipp.seg_rolpagina rp,ipp.seg_pagina p 
                      where rp.id_pagina=p.id_pagina and rp.apiestado='ELABORADO' and p.apiestado='ELABORADO' and rp.id_rol=${id_rol} and p.id_pagina_padre=${id_pagina_padre} order by p.orden;`;
   Listar(consulta,res);
}
const Listar = async(consulta:string,res:Response) => {
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