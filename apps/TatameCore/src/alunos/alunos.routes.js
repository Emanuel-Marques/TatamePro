import express from 'express';
const router = express.Router();
import alunosController from './alunos.controller.js';

router.get('/', alunosController.getAll);
router.get('/:alunoId', alunosController.getById);
router.post('/cadastrar', alunosController.create);
router.put('/actualizar/:alunoId', alunosController.update);
router.delete('/apagar/:alunoId', alunosController.deleteAluno);

export default router;