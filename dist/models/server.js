"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_route_1 = __importDefault(require("../routes/login_route"));
const menu_route_1 = __importDefault(require("../routes/menu_route"));
const list_route_1 = __importDefault(require("../routes/list_route"));
const seg_pagina_rou_1 = __importDefault(require("../routes/seg_pagina.rou"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/api/login', login_route_1.default);
        this.app.use('/api/menu', menu_route_1.default);
        this.app.use('/api', list_route_1.default);
        this.app.use('/api/seg_pagina', seg_pagina_rou_1.default);
    }
}
exports.default = Server;
