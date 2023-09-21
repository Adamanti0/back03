"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seg_pagina = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.seg_pagina = connection_1.default.define('seg_pagina', {
    id_pagina: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_pagina_padre: { type: sequelize_1.DataTypes.INTEGER },
    enlace: { type: sequelize_1.DataTypes.TEXT },
    icono: { type: sequelize_1.DataTypes.TEXT },
    nombre: { type: sequelize_1.DataTypes.TEXT },
    apiestado: { type: sequelize_1.DataTypes.STRING },
    usucre: { type: sequelize_1.DataTypes.STRING },
    feccre: { type: sequelize_1.DataTypes.DATE },
    usumod: { type: sequelize_1.DataTypes.STRING },
    fecmod: { type: sequelize_1.DataTypes.DATE },
    orden: { type: sequelize_1.DataTypes.INTEGER },
}, {
    schema: 'ipp',
    tableName: 'seg_pagina',
    timestamps: false
});
