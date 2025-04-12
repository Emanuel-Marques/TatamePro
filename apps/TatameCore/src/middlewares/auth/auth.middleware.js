import { validarToken } from '../../utils/auth/validarToken.js'; 

const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) return res.status(401).json({ message: 'Token não encontrado!' });

    // Bearer token
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer') return res.status(401).json({ message: 'Tipo de token inválido!' });

    const utilizador = validarToken(token);
    
    if (!utilizador) return res.status(401).json({ message: 'Token inválido!' });
    next();
}

export default authMiddleware;