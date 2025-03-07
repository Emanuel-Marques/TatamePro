import express from 'express';
import modalidadesRoutes from '../modalidades/modalidades.routes.js';
import utilizadoresRoutes from '../utilizadores/utilizadores.routes.js';
import planosRoutes from '../planos/planos.routes.js';
const router = express.Router();

router.use('/modalidades', modalidadesRoutes);
router.use('/utilizadores', utilizadoresRoutes);
router.use('/planos', planosRoutes);


export default router;