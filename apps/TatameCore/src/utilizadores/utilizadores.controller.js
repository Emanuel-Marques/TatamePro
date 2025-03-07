import utilizadoresService from "./utilizadores.service.js";

async function create(req, res) {
  const { nome, email, senha, perfil } = req.body;
  if (!nome || !email || !senha || !perfil) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }
  const utilizador = { nome, email, senha, perfil };
  const { insertId } = await utilizadoresService.create(utilizador);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await utilizadoresService.getAll();
  res.status(200).json({ data: result });
}

async function getById(req, res) {
  const { utilizadorId } = req.params;

  if (!utilizadorId || Number.isNaN(utilizadorId)) {
    return res.status(400).json({ message: "id do utilizador inexistente!" });
  }

  const result = await utilizadoresService.getById(utilizadorId);

  if (result.length == 0) {
    return res.status(404).json({ message: "Utilizador não encontrado!" });
  }

  res.status(200).json({ data: result });
}

async function update(req, res) {
  const { utilizadorId } = req.params;
  const { nome, email, senha, perfil } = req.body;

  if (!utilizadorId || Number.isNaN(utilizadorId) || !nome || !email || !senha || !perfil ) {
    return res.status(400).json({ message: "id ou campos inexistentes!" });
  }

  const modalidade = await utilizadoresService.getById(utilizadorId);
  if (modalidade.length == 0) {
    return res.status(404).json({ message: "Modalidade não encontrada!" });
  }

  const result = await utilizadoresService.update(modalidadeId, nomeModalidade);

  res.status(204).json();
}

async function deleteUtilizador(req, res) {
    const { modalidadeId } = req.params;
  
    if (!modalidadeId || Number.isNaN(modalidadeId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const modalidade = await utilizadoresService.getById(modalidadeId);

    if (modalidade.length == 0) {
      return res.status(404).json({ message: "Modalidade não encontrada!" });
    }
  
    const result = await utilizadoresService.deleteUtilizador(modalidadeId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deleteUtilizador
};
