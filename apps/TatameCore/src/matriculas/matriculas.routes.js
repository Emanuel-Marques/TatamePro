import express from 'express';
import matriculasController from './matriculas.controller.js';
const router = express.Router();

router.get('/', matriculasController.getAll);
router.get('/:matriculaId', matriculasController.getById);
router.post('/cadastrar', matriculasController.create);
router.put('/actualizar/:matriculaId', matriculasController.update);
router.put('/apagar/:matriculaId', matriculasController.deleteMatricula);

export default router;
