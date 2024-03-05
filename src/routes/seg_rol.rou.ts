import { Router } from 'express';
import { postAll, postWhe, postCol, putPri, putCol } from '../controllers/seg_rol.con';
import validateToken from './validate-token';

const router = Router();

// Crear
router.post('/all/',               validateToken, postAll);
router.post('/whe/:condicion',     validateToken, postWhe);
router.post('/col/:column/:valor', validateToken, postCol);

// Modificar
router.put('/pri/:id',            validateToken, putPri);
router.put('/col/:column/:valor', validateToken, putCol);

export default router;