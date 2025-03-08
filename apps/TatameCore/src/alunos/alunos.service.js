import utilizadoresService from '../utilizadores/utilizadores.service.js';
import { createUsername } from '../utils/stringHelpers.js';
import alunosModel from './alunos.model.js';

async function create (aluno){
    const { nome, email } = aluno;

    const utilizador = {
        nome: createUsername(nome),
        email,
        senha: process.env.DEFAULT_PASSWORD,
        perfil: 'Aluno'
    }
    const { insertId } = await utilizadoresService.create(utilizador);
    aluno.utilizadorId = insertId;

    const result = await alunosModel.create(aluno);
    return result;
}

async function getAll() {
    const result = await alunosModel.getAll();
    return result;
}

async function getById(alunoId) {
    const result = await alunosModel.getById(alunoId);
    return result;
}

async function update(alunoId, utilizadorId, modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro) {
    const result = await alunosModel.update(alunoId, utilizadorId, modalidadeId, nome, numeroBI,
        dataNascimento, nomePai, nomeMae, endereco, genero, telefone, email, bolseiro);
    return result;
}

async function deleteAluno(alunoId) {
    const result = await alunosModel.deleteAluno(alunoId);
    return result;
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteAluno
};