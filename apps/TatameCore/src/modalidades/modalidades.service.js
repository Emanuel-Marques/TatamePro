import modalidadesModel from './modalidades.model.js';
async function create(nomeModalidade) {
  const result = await modalidadesModel.create(nomeModalidade);
  return result;
}

async function getAll() {
    const result = await modalidadesModel.getAll();
    return result;
}

async function getById(modalidadeId) {
    const result = await modalidadesModel.getById(modalidadeId);
    return result;
}

async function update(modalidadeId, nomeModalidade) {
    const result = await modalidadesModel.update(modalidadeId, nomeModalidade);
    return result;
}

async function deleteModalidade(modalidadeId) {
    const result = await modalidadesModel.deleteModalidade(modalidadeId);
    return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteModalidade
};
