import { Router } from 'express';
import { getPadres, getHijos } from '../controllers/menu_controller';
import validateToken from './validate-token';

const router = Router();

router.get('/:id_rol',                  validateToken, getPadres);
router.get('/:id_rol/:id_pagina_padre', validateToken, getHijos);

export default router;