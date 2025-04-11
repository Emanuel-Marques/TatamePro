import utilizadoresService from "../utilizadores/utilizadores.service.js";
import { gerarToken } from "../utils/auth/gerarToken.js";
import { checkPassword } from "../utils/bcrypt.js";

async function login(email, password) {

  const [utilizador] = await utilizadoresService.getByEmail(email);
  
  if (!utilizador) throw new Error('Usuário não encontrado');

  const compatibilidadeDeSenha = await checkPassword(password, utilizador.senha);
  if (!compatibilidadeDeSenha) throw new Error('Senha incorreta');

  const token = gerarToken(utilizador);
  if (!token) throw new Error('Erro ao gerar token');
  return token;
}

export default {
  login,
};