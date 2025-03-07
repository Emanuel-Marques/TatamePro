import planoModel from './planos.model.js';
async function create(plano) {
  const result = await planoModel.create(plano);
  return result;
}

async function getAll() {
    const result = await planoModel.getAll();
    return result;
}

async function getById(planoId) {
    const result = await planoModel.getById(planoId);
    return result;
}

async function update(planoId, nomePlano, valorMensalidade, duracaoMeses) {
    const result = await planoModel.update(planoId, nomePlano, valorMensalidade, duracaoMeses);
    return result;
}

async function deletePlano(planoId) {
    const result = await planoModel.deletePlano(planoId);
    return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  deletePlano
};