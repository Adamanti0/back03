"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const seg_usuario_model_1 = require("../models/seg_usuario.model");
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    const usuario = yield seg_usuario_model_1.SegUsuario.findOne({ where: { login: login }, attributes: ['id_usuario', 'login', 'password'] });
    if (!usuario)
        return res.status(400).json({ msg: `No existe el usuario ${login}` });
    const crypto = require('crypto');
    const passwordEnviada = crypto.createHash('md5').update(password).digest('hex');
    if (usuario.dataValues.password != passwordEnviada)
        return res.status(400).json({ msg: 'Password incorrecto' });
    const usuarioEstado = yield seg_usuario_model_1.SegUsuario.findOne({ where: { login: login, apiestado: 'ELABORADO' }, attributes: ['login', 'password'] });
    if (!usuarioEstado)
        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra activo` });
    const usuarioVigente = yield seg_usuario_model_1.SegUsuario.findOne({ where: { login: login, fecha_vigente: { [sequelize_1.Op.gte]: new Date() } }, attributes: ['login', 'password'] });
    if (!usuarioVigente)
        return res.status(400).json({ msg: `El usuario ${login}, no se encuentra vigente` });
    const token = jsonwebtoken_1.default.sign({ id_usuario: usuario === null || usuario === void 0 ? void 0 : usuario.dataValues.id_usuario, login: login }, process.env.SECRET_KEY || 'pepito123', { expiresIn: '3600000' });
    res.json(token);
});
exports.login = login;
