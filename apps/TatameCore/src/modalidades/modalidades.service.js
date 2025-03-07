import modalidadesModel from './modalidades.model.js';
async function create(nomeModalidade) {
  const result = await modalidadesModel.create(nomeModalidade);
  return { data: result }
}

async function getAll() {
    const result = await modalidadesModel.getAll();
    return { data: result }
}

async function getById(modalidadeId) {
    const result = await modalidadesModel.create(modalidadeId);
    return { data: result }
}

export default {
  create,
  getAll,
  getById,
};
