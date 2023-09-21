import express, { Application } from 'express';
import cors from 'cors';
import RouteLogin from '../routes/login_route';
import RouteMenu from '../routes/menu_route';
import RouteList from '../routes/list_route';
import RouteSegPagina from '../routes/seg_pagina.rou';

class Server{
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3000';
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }
    routes(){
        this.app.use('/api/login',RouteLogin);
        this.app.use('/api/menu',RouteMenu);
        this.app.use('/api',RouteList);
        this.app.use('/api/seg_pagina',RouteSegPagina);
    }
}

export default Server;