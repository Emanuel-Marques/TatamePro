import express from 'express';
const router = express.Router();
import planosController from './planos.controller.js';

router.get('/', planosController.getAll);
router.get('/:planoId', planosController.getById);
router.post('/cadastrar', planosController.create);
router.put('/actualizar/:planoId', planosController.update);
router.delete('/apagar/:planoId', planosController.deletePlano);


export default router;