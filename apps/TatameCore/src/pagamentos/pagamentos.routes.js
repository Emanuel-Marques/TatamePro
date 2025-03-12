import express from 'express';
const router = express.Router();
import pagamentosController from './pagamentos.controller.js';

router.get('/', pagamentosController.getAll);
router.get('/:pagamentoId', pagamentosController.getById);
router.post('/cadastrar', pagamentosController.create);
router.put('/actualizar/:pagamentoId', pagamentosController.update);
router.delete('/:pagamentoId', pagamentosController.deletePagamento);

export default router;