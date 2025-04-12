import jwt from 'jsonwebtoken';

const gerarToken = (utilizador) => {
    const secret = process.env.JWT_SECRET;
    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256'
    }
    const token = jwt.sign(
        {
            data: { email: utilizador.email, nome: utilizador.nome, perfil: utilizador.perfil }
        },
        secret, 
        jwtConfig
    )
    return token;
}

export { gerarToken };