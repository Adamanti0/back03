import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const seg_rol = sequelize.define(
   'seg_rol', 
   {
      id_rol: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      sigla: { type: DataTypes.STRING},
      descripcion: { type: DataTypes.STRING},
      apiestado: { type: DataTypes.STRING},
      usucre: { type: DataTypes.STRING},
      feccre: { type: DataTypes.DATE},
      usumod: { type: DataTypes.STRING},
      fecmod: { type: DataTypes.DATE},
   }, 
   { 
      schema: 'ipp', 
      tableName: 'seg_rol',
      timestamps: false
   }
);