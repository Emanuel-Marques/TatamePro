import professoresModel from './professores.model.js';
async function create(professor) {
  const result = await professoresModel.create(professor);
  return result;
}

async function getAll() {
    const result = await professoresModel.getAll();
    return result;
}

async function getById(professorId) {
    const result = await professoresModel.getById(professorId);
    return result;
}

async function update(professorId, utilizadorId, nome, especialidade) {
    const result = await professoresModel.update(professorId, utilizadorId, nome, especialidade);
    return result;
}

async function deleteProfessor(professorId) {
    const result = await professoresModel.deleteProfessor(professorId);
    return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteProfessor
};