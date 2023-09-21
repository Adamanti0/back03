"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const list_controller_1 = require("../controllers/list_controller");
const router = (0, express_1.Router)();
router.get('/:esquema/:vista', list_controller_1.list_view);
exports.default = router;
