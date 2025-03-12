import express from 'express';
import cobrancasController from './cobrancas.controller.js';
const router = express.Router();

router.get('/porMatricula/:matriculaId', cobrancasController.getByMatricula);

export default router;