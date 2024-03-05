"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seg_rol = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.seg_rol = connection_1.default.define('seg_rol', {
    id_rol: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sigla: { type: sequelize_1.DataTypes.STRING },
    descripcion: { type: sequelize_1.DataTypes.STRING },
    apiestado: { type: sequelize_1.DataTypes.STRING },
    usucre: { type: sequelize_1.DataTypes.STRING },
    feccre: { type: sequelize_1.DataTypes.DATE },
    usumod: { type: sequelize_1.DataTypes.STRING },
    fecmod: { type: sequelize_1.DataTypes.DATE },
}, {
    schema: 'ipp',
    tableName: 'seg_rol',
    timestamps: false
});
