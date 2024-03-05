import { Request, Response } from "express"
import { SegUsuario } from "../models/seg_usuario.model";
import { Op, QueryTypes } from "sequelize";
import jwt from 'jsonwebtoken';
import sequelize from "../db/connection";

export const login = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const consulta = `select*from ipp.seg_usuario usu,ipp.seg_usuariorestriccion res where usu.id_usuario=res.id_usuario and login='${login}'`;
    const usuario:any = await sequelize.query(consulta, { type: QueryTypes.SELECT });
    if (usuario.length<1)
       return res.status(400).json({ msg: `No existe el usuario ${login}` });
    const crypto = require('crypto');
    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
    if (usuario[0].password != passwordEnviada)
        return res.status(400).json({ msg: 'Password incorrecto' });
    const usuarioEstado = await SegUsuario.findOne({where:{login:login,apiestado:'ELABORADO'},attributes:['login','password']});
    if (!usuarioEstado)
        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra activo` });
    const usuarioVigente = await SegUsuario.findOne({where:{login:login,fecha_vigente:{[Op.gte]:new Date()}},attributes:['login','password']});
    if (!usuarioVigente)
        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra vigente` });
    const token = jwt.sign(
        { id_usuario:usuario[0].id_usuario, login: login, id_rol: usuario[0].id_rol, departamentos: usuario[0].departamentos },
        process.env.SECRET_KEY || 'pepito123',
        { expiresIn: '3600000' }
    )
    res.json(token);
}
// export const login = async (req: Request, res: Response) => {
//    const { login, password } = req.body;
//    const usuario = await SegUsuario.findOne({ where: { login: login }, attributes: ['id_usuario', 'login', 'password'] });
//    if (!usuario)
//        return res.status(400).json({ msg: `No existe el usuario ${login}` });
//    const crypto = require('crypto');
//    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
//    if (usuario.dataValues.password != passwordEnviada)
//        return res.status(400).json({ msg: 'Password incorrecto' });
//    const usuarioEstado = await SegUsuario.findOne({where:{login:login,apiestado:'ELABORADO'},attributes:['login','password']});
//    if (!usuarioEstado)
//        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra activo` });
//    const usuarioVigente = await SegUsuario.findOne({where:{login:login,fecha_vigente:{[Op.gte]:new Date()}},attributes:['login','password']});
//    if (!usuarioVigente)
//        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra vigente` });
//    const token = jwt.sign(
//        { id_usuario:usuario?.dataValues.id_usuario, login: login },
//        process.env.SECRET_KEY || 'pepito123',
//        { expiresIn: '3600000' }
//    )
//    res.json(token);
// }