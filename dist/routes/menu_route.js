"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_controller_1 = require("../controllers/menu_controller");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.get('/:id_rol', validate_token_1.default, menu_controller_1.getPadres);
router.get('/:id_rol/:id_pagina_padre', validate_token_1.default, menu_controller_1.getHijos);
exports.default = router;
