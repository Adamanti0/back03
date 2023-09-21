import { Request, Response } from "express"
import { SegUsuario } from "../models/seg_usuario.model";
import { Op, QueryTypes } from "sequelize";
import sequelize from "../db/connection";
import jwt from 'jsonwebtoken';

export const loginSegUsuario = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const usuario = await SegUsuario.findOne({ where: { login: login }, attributes: ['id_usuario', 'login', 'password'] });
    //console.log(usuario?.dataValues.id_usuario);
    if (!usuario)
        return res.status(400).json({ msg: `No existe el usuario ${login}` });
    const crypto = require('crypto');
    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
    if (usuario.dataValues.password != passwordEnviada)
        return res.status(400).json({ msg: 'Password incorrecto' });
    const usuarioEstado = await SegUsuario.findOne({where:{login:login,apiestado:'ELABORADO'},attributes:['login','password']});
    if (!usuarioEstado)
        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra activo` });
    const usuarioVigente = await SegUsuario.findOne({where:{login:login,fecha_vigente:{[Op.gte]:new Date()}},attributes:['login','password']});
    if (!usuarioVigente)
        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra vigente` });
    const token = jwt.sign(
        { id_usuario:usuario?.dataValues.id_usuario, login: login },
        process.env.SECRET_KEY || 'pepito123',
        { expiresIn: '90000' }
    )
    res.json(token);
}
export const getSegUsuario = async (req: Request, res: Response) => {
    const lista = await SegUsuario.findAll();
    res.json(lista);
}
export const findSegUsuario = async (req: Request, res: Response) => {
    const{id_usuario}=req.params;
    const usuario=await SegUsuario.findByPk(id_usuario);
    if(usuario)
        res.json(usuario);
    else
        res.status(404).json({msg:`No existe el usuario con el id ${id_usuario}`})
}
export const deleteSegUsuario = async (req: Request, res: Response) => {
    const{id_usuario}=req.params;
    try{
        const usuario=await SegUsuario.findByPk(id_usuario);
        if(!usuario)
            res.status(404).json({msg:`No existe el usuario con el id ${id_usuario}`})
        else{
            await usuario.destroy();
            res.json({msg:`El usuario ${id_usuario} fue eliminado`});
        }
    }catch(error){
        res.json({msg:`Ocurrio un error al eliminar el usuario`});
    }
}
export const postSegUsuario = async (req: Request, res: Response) => {
    const{body}=req;
    try {
        const registro = await SegUsuario.findOne({ where: { login: body.login }, attributes: ['login'] });
        if (registro)
            return res.status(400).json({ msg: `Ya existe el registro ${body.login}` });
        const crypto = require('crypto');
        body.password = crypto.createHash('md5').update(body.login).digest('hex');
        const year = new Date().getFullYear();
        body.fecha_vigente=new Date(year, 11, 31);
        await SegUsuario.create(body);
        res.json({msg:`El registro ${body.login} fue creado exitosamente`});
    } catch (error) {
        res.json({msg:`Ocurrio un error al crear el registro`});
    }
}
export const updateSegUsuario = async (req: Request, res: Response) => {
    const{body}=req;
    const{id}=req.params;
    try{
        const registro=await SegUsuario.findByPk(id);
        if(registro){
            await registro.update(body);
            res.json({msg:`El registro ${body.login} fue actualizado`});
        }else
            res.status(404).json({msg:`No existe el registro con identificador ${id}`});
    }catch(error){
        res.json({msg:`Ocurrio un error al modificar el registro`});
    }
}