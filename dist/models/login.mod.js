"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
exports.Login = connection_1.default.define('login', {
    apiestado: { type: sequelize_1.DataTypes.STRING },
    carnet: { type: sequelize_1.DataTypes.DECIMAL },
    correo: { type: sequelize_1.DataTypes.TEXT },
    departamentos: { type: sequelize_1.DataTypes.TEXT },
    device_id: { type: sequelize_1.DataTypes.TEXT },
    direccion: { type: sequelize_1.DataTypes.TEXT },
    fec_nacimiento: { type: sequelize_1.DataTypes.DATE },
    feccre: { type: sequelize_1.DataTypes.DATE },
    fecha_vigente: { type: sequelize_1.DataTypes.DATE },
    fechavigente: { type: sequelize_1.DataTypes.DATE },
    fecmod: { type: sequelize_1.DataTypes.DATE },
    foto: { type: sequelize_1.DataTypes.STRING },
    genero: { type: sequelize_1.DataTypes.INTEGER },
    id_brigada: { type: sequelize_1.DataTypes.INTEGER },
    id_departamento: { type: sequelize_1.DataTypes.INTEGER },
    id_proyecto: { type: sequelize_1.DataTypes.INTEGER },
    id_rol: { type: sequelize_1.DataTypes.INTEGER },
    id_usuario: { type: sequelize_1.DataTypes.INTEGER },
    id_usurestriccion: { type: sequelize_1.DataTypes.INTEGER },
    login: { type: sequelize_1.DataTypes.STRING },
    materno: { type: sequelize_1.DataTypes.TEXT },
    nombre: { type: sequelize_1.DataTypes.TEXT },
    password: { type: sequelize_1.DataTypes.STRING },
    paterno: { type: sequelize_1.DataTypes.TEXT },
    proyectos: { type: sequelize_1.DataTypes.TEXT },
    remember_token: { type: sequelize_1.DataTypes.STRING },
    serie: { type: sequelize_1.DataTypes.STRING },
    telefono: { type: sequelize_1.DataTypes.DECIMAL },
    usucre: { type: sequelize_1.DataTypes.STRING },
    usumod: { type: sequelize_1.DataTypes.STRING },
}, {
    schema: 'ipp',
    tableName: 'login',
    timestamps: false
});
