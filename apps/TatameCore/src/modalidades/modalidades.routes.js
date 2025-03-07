import express from 'express';
const router = express.Router();
import modalidadesController from './modalidades.controller.js';

router.get('/', modalidadesController.getAll);
router.get('/:modalidadeId', modalidadesController.getById);
router.post('/cadastrar', modalidadesController.create);
router.put('/actualizar/:modalidadeId', modalidadesController.update);
router.delete('/apagar/:modalidadeId', modalidadesController.deleteModalidade);


export default router;