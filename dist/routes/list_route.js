"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../controllers/list_controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/object/:esquema/:objeto', validate_token_1.default, list_controller_1.getAll);
router.get('/object/:esquema/:objeto/:condicion', validate_token_1.default, list_controller_1.getWhere);
router.get('/object/:esquema/:objeto/:column/:valor', validate_token_1.default, list_controller_1.getColumn);
router.get('/function/:esquema/:funcion', validate_token_1.default, list_controller_1.getFunction);
router.get('/apiestado/:esquema/:objeto/:apiestado/:usumod/:condicion', validate_token_1.default, list_controller_1.getApiestado);
exports.default = router;
