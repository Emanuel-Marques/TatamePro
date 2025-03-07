import express from 'express';
import modalidadesRoutes from '../modalidades/modalidades.routes.js';
import utilizadoresRoutes from '../utilizadores/utilizadores.routes.js';
const router = express.Router();

router.use('/modalidades', modalidadesRoutes);
router.use('/utilizadores', utilizadoresRoutes);


export default router;