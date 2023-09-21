"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const seg_pagina_con_1 = require("../controllers/seg_pagina.con");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
// Crear
router.post('/all/', validate_token_1.default, seg_pagina_con_1.postAll);
router.post('/whe/:condicion', validate_token_1.default, seg_pagina_con_1.postWhe);
router.post('/col/:column/:valor', validate_token_1.default, seg_pagina_con_1.postCol);
// Modificar
router.put('/pri/:id', validate_token_1.default, seg_pagina_con_1.putPri);
router.put('/col/:column/:valor', validate_token_1.default, seg_pagina_con_1.putCol);
exports.default = router;
