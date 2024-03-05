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
exports.putCol = exports.putPri = exports.postCol = exports.postWhe = exports.postAll = void 0;
const seg_rol_mod_1 = require("./../models/seg_rol.mod");
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const postAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        yield seg_rol_mod_1.seg_rol.create(body);
        res.json({ msg: `Se creo el registro, en seg_rol` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.postAll = postAll;
const postWhe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { condicion } = req.params;
    const consulta = `select*from ipp.seg_rol where ${condicion}`;
    functionPost(consulta, res, body);
});
exports.postWhe = postWhe;
const postCol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { column, valor } = req.params;
    body[column] = valor;
    const consulta = `select*from ipp.seg_rol where ${column}::text='${valor}'`;
    functionPost(consulta, res, body);
});
exports.postCol = postCol;
const functionPost = (consulta, res, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registro = yield connection_1.default.query(consulta, { type: sequelize_1.QueryTypes.SELECT });
        if (registro.length > 0)
            return res.status(400).json({ msg: `La consulta: ${consulta}, devuelve registros, no se pudo crear el registro en seg_rol` });
        yield seg_rol_mod_1.seg_rol.create(body);
        res.json({ msg: `Se creo el registro, en seg_rol` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
const putPri = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const registro = yield seg_rol_mod_1.seg_rol.findByPk(id);
        if (registro) {
            yield registro.update(body);
            res.json({ msg: `El registro fue actualizado en seg_rol` });
        }
        else
            res.status(404).json({ msg: `No existe el registro con identificador ${id}, en seg_rol` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.putPri = putPri;
const putCol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { column, valor } = req.params;
    try {
        body[column] = valor;
        const whereCondition = { [column]: valor };
        const registro = yield seg_rol_mod_1.seg_rol.findAll({ where: whereCondition });
        if (registro.length > 0) {
            yield seg_rol_mod_1.seg_rol.update(body, { where: whereCondition });
            res.json({ msg: 'Los registros fueron actualizados en seg_rol' });
        }
        else
            res.status(404).json({ msg: `No existen registros que cumplan la condicion, en seg_rol` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.putCol = putCol;
