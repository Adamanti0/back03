"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegUsuario = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.SegUsuario = connection_1.default.define('seg_usuario', {
    id_usuario: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_departamento: { type: sequelize_1.DataTypes.INTEGER },
    login: { type: sequelize_1.DataTypes.STRING },
    password: { type: sequelize_1.DataTypes.STRING },
    carnet: { type: sequelize_1.DataTypes.DECIMAL },
    nombre: { type: sequelize_1.DataTypes.TEXT },
    paterno: { type: sequelize_1.DataTypes.TEXT },
    materno: { type: sequelize_1.DataTypes.TEXT },
    direccion: { type: sequelize_1.DataTypes.TEXT },
    telefono: { type: sequelize_1.DataTypes.DECIMAL },
    fecha_vigente: { type: sequelize_1.DataTypes.DATE },
    foto: { type: sequelize_1.DataTypes.STRING },
    fec_nacimiento: { type: sequelize_1.DataTypes.DATE },
    correo: { type: sequelize_1.DataTypes.TEXT },
    serie: { type: sequelize_1.DataTypes.STRING },
    id_brigada: { type: sequelize_1.DataTypes.INTEGER },
    remember_token: { type: sequelize_1.DataTypes.STRING },
    apiestado: { type: sequelize_1.DataTypes.STRING },
    usucre: { type: sequelize_1.DataTypes.STRING },
    feccre: { type: sequelize_1.DataTypes.DATE },
    usumod: { type: sequelize_1.DataTypes.STRING },
    fecmod: { type: sequelize_1.DataTypes.DATE },
    genero: { type: sequelize_1.DataTypes.INTEGER },
    device_id: { type: sequelize_1.DataTypes.TEXT },
}, {
    schema: 'ipp',
    tableName: 'seg_usuario',
    timestamps: false
});
