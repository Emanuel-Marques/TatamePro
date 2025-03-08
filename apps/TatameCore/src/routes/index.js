import express from 'express';
import modalidadesRoutes from '../modalidades/modalidades.routes.js';
import utilizadoresRoutes from '../utilizadores/utilizadores.routes.js';
import planosRoutes from '../planos/planos.routes.js';
import professoresRoutes from '../professores/professores.routes.js';
import alunosRoutes from '../alunos/alunos.routes.js';
const router = express.Router();

router.use('/modalidades', modalidadesRoutes);
router.use('/utilizadores', utilizadoresRoutes);
router.use('/planos', planosRoutes);
router.use('/professores', professoresRoutes);
router.use('/alunos', alunosRoutes);


export default router;