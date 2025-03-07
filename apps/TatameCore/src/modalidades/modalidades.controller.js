import modalidadesService from "./modalidades.service.js";

async function create(req, res) {
  const { nomeModalidade } = req.body;
  if (!nomeModalidade) {
    return res
      .status(400)
      .json({ message: "Deve ser passado o nome da modalidade!" });
  }
  const { insertId } = await modalidadesService.create(nomeModalidade);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await modalidadesService.getAll();
  res.status(200).json({ data: result });
}

async function getById(req, res) {
  const { modalidadeId } = req.params;

  if (!modalidadeId || Number.isNaN(modalidadeId)) {
    return res.status(400).json({ message: "Deve ser passado a modalidade!" });
  }

  const result = await modalidadesService.getById(modalidadeId);

  if (result.length == 0) {
    return res.status(404).json({ message: "Modalidade não encontrada!" });
  }

  res.status(200).json({ data: result });
}

async function update(req, res) {
  const { modalidadeId } = req.params;
  const { nomeModalidade } = req.body;

  if (!modalidadeId || Number.isNaN(modalidadeId) || !nomeModalidade ) {
    return res.status(400).json({ message: "id ou nome da modalidade inexistentes!" });
  }

  const modalidade = await modalidadesService.getById(modalidadeId);
  if (modalidade.length == 0) {
    return res.status(404).json({ message: "Modalidade não encontrada!" });
  }

  const result = await modalidadesService.update(modalidadeId, nomeModalidade);

  res.status(204).json();
}

async function deleteModalidade(req, res) {
    const { modalidadeId } = req.params;
  
    if (!modalidadeId || Number.isNaN(modalidadeId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const modalidade = await modalidadesService.getById(modalidadeId);

    if (modalidade.length == 0) {
      return res.status(404).json({ message: "Modalidade não encontrada!" });
    }
  
    const result = await modalidadesService.deleteModalidade(modalidadeId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deleteModalidade
};
