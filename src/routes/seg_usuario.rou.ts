import { Router } from 'express';
import { deleteSegUsuario, findSegUsuario, getSegUsuario, loginSegUsuario, postSegUsuario, updateSegUsuario } from '../controllers/seg_usuario.con';
import validateToken from './validate-token';

const router = Router();

router.post(  '/login', loginSegUsuario);

router.get(   '/',    getSegUsuario);   //Listar
router.get(   '/:id', findSegUsuario);  //Buscar
router.delete('/:id', validateToken, deleteSegUsuario);//Eliminar
router.post(  '/',    validateToken, postSegUsuario);  //Crear
router.put(   '/:id', validateToken, updateSegUsuario);//Modificar

export default router;