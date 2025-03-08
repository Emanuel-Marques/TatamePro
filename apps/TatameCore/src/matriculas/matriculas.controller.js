import matriculasService from "./matriculas.service.js";

async function create(req, res) {
  const { planoId, dataInicio, estado, modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro } = req.body;

  if ( !planoId || !dataInicio || !modalidadeId || !nome || !numeroBI || !dataNascimento || !nomePai ||
    !nomeMae || !endereco || !genero || !telefone || !email || !bolseiro ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }

  const matricula = { planoId, dataInicio, estado };
  const aluno = { modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
    nomeMae, endereco, genero, telefone, email, bolseiro };
  
  const { insertId } = await matriculasService.create(matricula, aluno);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await matriculasService.getAll();
  res.status(200).json({ data: result });
}

async function getById(req, res) {
  const { matriculaId } = req.params;

  if (!matriculaId || Number.isNaN(matriculaId)) {
    return res.status(400).json({ message: "id da matricula inexistente!" });
  }

  const result = await matriculasService.getById(matriculaId);

  if (result.length == 0) {
    return res.status(404).json({ message: "Matricula não encontrada!" });
  }

  res.status(200).json({ data: result });
}

async function update(req, res) {
  const { matriculaId } = req.params;
  const { alunoId, planoId, dataInicio, estado } = req.body;

  if (!matriculaId || Number.isNaN(matriculaId) || !alunoId || !planoId || !dataInicio || !estado ) {
    return res.status(400).json({ message: "id ou campos inexistentes!" });
  }

  const matricula = await matriculasService.getById(matriculaId);
  if (matricula.length == 0) {
    return res.status(404).json({ message: "matricula não encontrada!" });
  }

  const result = await matriculasService.update(matriculaId, alunoId, planoId, dataInicio, estado);

  res.status(204).json();
}

async function deleteMatricula(req, res) {
    const { matriculaId } = req.params;
  
    if (!matriculaId || Number.isNaN(matriculaId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const matricula = await matriculasService.getById(matriculaId);

    if (matricula.length == 0) {
      return res.status(404).json({ message: "Matricula não encontrada!" });
    }
  
    const result = await matriculasService.deleteMatricula(matriculaId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deleteMatricula
};