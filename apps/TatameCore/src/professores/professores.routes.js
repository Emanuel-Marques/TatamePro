import express from 'express';
const router = express.Router();
import professoresController from './professores.controller.js';

router.get('/', professoresController.getAll);
router.get('/:professorId', professoresController.getById);
router.post('/cadastrar', professoresController.create);
router.put('/actualizar/:professorId', professoresController.update);
router.delete('/apagar/:professorId', professoresController.deleteProfessor);


export default router;