import alunosService from "./alunos.service.js";

async function create(req, res) {
  const { modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro } = req.body;

  if ( !modalidadeId || !nome || !numeroBI || !dataNascimento || !nomePai ||
    !nomeMae || !endereco || !genero || !telefone || !email || !bolseiro ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  const aluno = { modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro };
  const { insertId } = await alunosService.create(aluno);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await alunosService.getAll();
  res.status(200).json({ data: result });
}

async function getById(req, res) {
  const { alunoId } = req.params;

  if (!alunoId || Number.isNaN(alunoId)) {
    return res.status(400).json({ message: "id do aluno inexistente!" });
  }

  const result = await alunosService.getById(alunoId);

  if (result.length == 0) {
    return res.status(404).json({ message: "aluno não encontrado!" });
  }

  res.status(200).json({ data: result });
}

async function update(req, res) {
  const { alunoId } = req.params;
  const { utilizadorId, modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro } = req.body;

  if (!alunoId || Number.isNaN(alunoId) || !modalidadeId || !nome || !numeroBI || !dataNascimento || !nomePai ||
  !nomeMae || !endereco || !genero || !telefone || !email || !bolseiro ) {
    return res.status(400).json({ message: "id ou campos inexistentes!" });
  }

  const aluno = await alunosService.getById(alunoId);
  if (aluno.length == 0) {
    return res.status(404).json({ message: "aluno não encontrado!" });
  }

  const result = await alunosService.update(alunoId, utilizadorId, modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro);

  res.status(204).json();
}

async function deleteAluno(req, res) {
    const { alunoId } = req.params;
  
    if (!alunoId || Number.isNaN(alunoId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const aluno = await alunosService.getById(alunoId);

    if (aluno.length == 0) {
      return res.status(404).json({ message: "Aluno não encontrado!" });
    }
  
    const result = await alunosService.deleteAluno(alunoId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deleteAluno
};