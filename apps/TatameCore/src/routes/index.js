import express from 'express';
import modalidadesRoutes from '../modalidades/modalidades.routes.js';
import utilizadoresRoutes from '../utilizadores/utilizadores.routes.js';
import planosRoutes from '../planos/planos.routes.js';
import professoresRoutes from '../professores/professores.routes.js';
import alunosRoutes from '../alunos/alunos.routes.js';
import matriculasRoutes from '../matriculas/matriculas.routes.js';
import pagamentosRoutes from '../pagamentos/pagamentos.routes.js';
import cobrancasRoutes from '../cobrancas/cobrancas.routes.js';
const router = express.Router();

router.use('/modalidades', modalidadesRoutes);
router.use('/utilizadores', utilizadoresRoutes);
router.use('/planos', planosRoutes);
router.use('/professores', professoresRoutes);
router.use('/alunos', alunosRoutes);
router.use('/matriculas', matriculasRoutes);
router.use('/pagamentos', pagamentosRoutes);
router.use('/cobrancas', cobrancasRoutes);


export default router;