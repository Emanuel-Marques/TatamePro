import planosService from "./planos.service.js";

async function create(req, res) {
  const { nomePlano, valorMensalidade, duracaoMeses } = req.body;
  if (!nomePlano || !valorMensalidade || !duracaoMeses ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }
  const plano = { nomePlano, valorMensalidade, duracaoMeses };
  const { insertId } = await planosService.create(plano);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await planosService.getAll();
  res.status(200).json({ data: result });
}

async function getById(req, res) {
  const { planoId } = req.params;

  if (!planoId || Number.isNaN(planoId)) {
    return res.status(400).json({ message: "id do plano inexistente!" });
  }

  const result = await planosService.getById(planoId);

  if (result.length == 0) {
    return res.status(404).json({ message: "Utilizador não encontrado!" });
  }

  res.status(200).json({ data: result });
}

async function update(req, res) {
  const { planoId } = req.params;
  const { nomePlano, valorMensalidade, duracaoMeses } = req.body;

  if (!planoId || Number.isNaN(planoId) || !nomePlano || !valorMensalidade || !duracaoMeses ) {
    return res.status(400).json({ message: "id ou campos inexistentes!" });
  }

  const plano = await planosService.getById(planoId);
  if (plano.length == 0) {
    return res.status(404).json({ message: "plano não encontrado!" });
  }

  const result = await planosService.update(planoId, nomePlano, valorMensalidade, duracaoMeses);

  res.status(204).json();
}

async function deletePlano(req, res) {
    const { planoId } = req.params;
  
    if (!planoId || Number.isNaN(planoId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const plano = await planosService.getById(planoId);

    if (plano.length == 0) {
      return res.status(404).json({ message: "Plano não encontrado!" });
    }
  
    const result = await planosService.deletePlano(planoId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deletePlano
};