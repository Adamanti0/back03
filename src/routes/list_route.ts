import { Router } from 'express';
import { getAll, getWhere, getColumn, getFunction, getApiestado, getQuery } from '../controllers/list_controller';
import validateToken from './validate-token';

const router = Router();

router.get('/query/:query',                                             validateToken, getQuery);
router.get('/object/:esquema/:objeto',                                  validateToken, getAll);
router.get('/object/:esquema/:objeto/:condicion',                       validateToken, getWhere);
router.get('/object/:esquema/:objeto/:column/:valor',                   validateToken, getColumn);
router.get('/function/:esquema/:funcion',                               validateToken, getFunction);
router.get('/apiestado/:esquema/:objeto/:apiestado/:usumod/:condicion', validateToken, getApiestado);

export default router;