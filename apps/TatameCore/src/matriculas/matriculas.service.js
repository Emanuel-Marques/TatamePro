import alunosService from '../alunos/alunos.service.js';
import matriculasService from './matriculas.model.js';
async function create(matricula, aluno) {
  const { insertId } = await alunosService.create(aluno);
  matricula.alunoId = insertId;
  const result = await matriculasService.create(matricula);
  return result;
}

async function getAll() {
    const result = await matriculasService.getAll();
    return result;
}

async function getById(matriculaId) {
    const result = await matriculasService.getById(matriculaId);
    return result;
}

async function update(matriculaId, alunoId, planoId, dataInicio, estado) {
    const result = await matriculasService.update(matriculaId, alunoId, planoId, dataInicio, estado);
    return result;
}

async function deleteMatricula(matriculaId) {
    const result = await matriculasService.deleteMatricula(matriculaId);
    return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteMatricula
};