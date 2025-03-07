import express from 'express';
import modalidadesRoutes from '../modalidades/modalidades.routes.js';
const router = express.Router();

router.use('/modalidades', modalidadesRoutes);


export default router;