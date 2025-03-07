import utilizadoresModel from './utilizadores.model.js';
async function create(utilizador) {
  const result = await utilizadoresModel.create(utilizador);
  return result;
}

async function getAll() {
    const result = await utilizadoresModel.getAll();
    return result;
}

async function getById(utilizadorId) {
    const result = await utilizadoresModel.getById(utilizadorId);
    return result;
}

async function update(utilizadorId, nome, email, senha, perfil) {
    const result = await utilizadoresModel.update(utilizadorId,  nome, email, senha, perfil);
    return result;
}

async function deleteUtilizador(utilizadorId) {
    const result = await utilizadoresModel.deleteUtilizador(utilizadorId);
    return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteUtilizador
};
