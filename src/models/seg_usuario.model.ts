import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const SegUsuario = sequelize.define(
   'seg_usuario', 
   {
      id_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      id_departamento: { type: DataTypes.INTEGER},
      login: { type: DataTypes.STRING},
      password: { type: DataTypes.STRING},
      carnet: { type: DataTypes.DECIMAL},
      nombre: { type: DataTypes.TEXT},
      paterno: { type: DataTypes.TEXT},
      materno: { type: DataTypes.TEXT},
      direccion: { type: DataTypes.TEXT},
      telefono: { type: DataTypes.DECIMAL},
      fecha_vigente: { type: DataTypes.DATE},
      foto: { type: DataTypes.STRING},
      fec_nacimiento: { type: DataTypes.DATE},
      correo: { type: DataTypes.TEXT},
      serie: { type: DataTypes.STRING},
      id_brigada: { type: DataTypes.INTEGER},
      remember_token: { type: DataTypes.STRING},
      apiestado: { type: DataTypes.STRING},
      usucre: { type: DataTypes.STRING},
      feccre: { type: DataTypes.DATE},
      usumod: { type: DataTypes.STRING},
      fecmod: { type: DataTypes.DATE},
      genero: { type: DataTypes.INTEGER},
      device_id: { type: DataTypes.TEXT},
   }, 
   { 
      schema: 'ipp', 
      tableName: 'seg_usuario',
      timestamps: false
   }
);