import express from 'express';
const router = express.Router();
import utilizadoresController from './utilizadores.controller.js';

router.get('/', utilizadoresController.getAll);
router.get('/:utilizadorId', utilizadoresController.getById);
router.post('/cadastrar', utilizadoresController.create);
router.put('/actualizar/:utilizadorId', utilizadoresController.update);
router.delete('/apagar/:utilizadorId', utilizadoresController.deleteUtilizador);


export default router;