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
exports.getHijos = exports.getPadres = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const getPadres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol } = req.params;
    const consulta = `select p.id_pagina,p.id_pagina_padre,icono,enlace,nombre
                       from ipp.seg_rolpagina rp,ipp.seg_pagina p 
                      where rp.id_pagina=p.id_pagina and rp.apiestado='ELABORADO' and p.apiestado='ELABORADO' and rp.id_rol=${id_rol} and p.id_pagina_padre=0 and enlace is null order by p.orden`;
    Listar(consulta, res);
});
exports.getPadres = getPadres;
const getHijos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_rol, id_pagina_padre } = req.params;
    const consulta = `select p.id_pagina,p.id_pagina_padre,icono,enlace,nombre
                       from ipp.seg_rolpagina rp,ipp.seg_pagina p 
                      where rp.id_pagina=p.id_pagina and rp.apiestado='ELABORADO' and p.apiestado='ELABORADO' and rp.id_rol=${id_rol} and p.id_pagina_padre=${id_pagina_padre} order by p.orden;`;
    Listar(consulta, res);
});
exports.getHijos = getHijos;
const Listar = (consulta, res) => __awaiter(void 0, void 0, void 0, function* () {
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
