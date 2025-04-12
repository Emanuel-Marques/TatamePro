import jwt from "jsonwebtoken";  

const validarToken = (token) => {
    try {
        const utilizador = jwt.verify(token, process.env.JWT_SECRET);
        return utilizador;
    } catch (error) {
        console.log("Erro na verificação do token:", error.message);
        return null;
    }
};

export { validarToken };