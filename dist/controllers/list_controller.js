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
exports.getApiestado = exports.getFunction = exports.getColumn = exports.getWhere = exports.getAll = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esquema, objeto } = req.params;
    const consulta = `select*from ${esquema}.${objeto}`;
    ListarTabla(consulta, res);
});
exports.getAll = getAll;
const getWhere = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esquema, objeto, condicion } = req.params;
    const consulta = `select*from ${esquema}.${objeto} where ${condicion}`;
    ListarTabla(consulta, res);
});
exports.getWhere = getWhere;
const getColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esquema, objeto, column, valor } = req.params;
    const consulta = `select*from ${esquema}.${objeto} where ${column}::text='${valor}'`;
    ListarTabla(consulta, res);
});
exports.getColumn = getColumn;
const ListarTabla = (consulta, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lista = yield connection_1.default.query(consulta, { type: sequelize_1.QueryTypes.SELECT });
        if (lista.length > 0)
            res.json(lista);
        else
            res.json({ msg: `La consulta ${consulta} no devolvio registros` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
const getFunction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esquema, funcion } = req.params;
    try {
        const respuesta = yield connection_1.default.query(`select*from ${esquema}.${funcion}()`, { type: sequelize_1.QueryTypes.SELECT });
        const lista = yield connection_1.default.query(respuesta[0][funcion], { type: sequelize_1.QueryTypes.SELECT });
        if (lista.length > 0)
            res.json(lista);
        else
            res.status(404).json({ msg: `La consulta select*from ${esquema}.${funcion}() no devolvio registros` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.getFunction = getFunction;
const getApiestado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { esquema, objeto, apiestado, usumod, condicion } = req.params;
    try {
        const lista = yield connection_1.default.query(`UPDATE ${esquema}.${objeto} SET apiestado=upper('${apiestado}'), usumod='${usumod}', fecmod=now() WHERE ${condicion}`, { type: sequelize_1.QueryTypes.SELECT });
        res.json({ msg: `El estado del registro se modifico a ${apiestado}` });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.getApiestado = getApiestado;
