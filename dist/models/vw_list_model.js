"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.e_vw_etim_consistencia_consumo = void 0;
const connection_1 = __importDefault(require("../db/connection"));
exports.e_vw_etim_consistencia_consumo = connection_1.default.define('vw_etim_consistencia_consumo', {}, { schema: 'etim', tableName: 'vw_etim_consistencia_consumo', timestamps: false });
