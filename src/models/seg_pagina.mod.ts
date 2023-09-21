import { DataTypes } from 'sequelize';
import sequelize from '../db/connection';

export const seg_pagina = sequelize.define(
   'seg_pagina', 
   {
      id_pagina: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      id_pagina_padre: { type: DataTypes.INTEGER},
      enlace: { type: DataTypes.TEXT},
      icono: { type: DataTypes.TEXT},
      nombre: { type: DataTypes.TEXT},
      apiestado: { type: DataTypes.STRING},
      usucre: { type: DataTypes.STRING},
      feccre: { type: DataTypes.DATE},
      usumod: { type: DataTypes.STRING},
      fecmod: { type: DataTypes.DATE},
      orden: { type: DataTypes.INTEGER},
   }, 
   { 
      schema: 'ipp', 
      tableName: 'seg_pagina',
      timestamps: false
   }
);