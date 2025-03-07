import modalidadesService from './modalidades.service.js';
async function create(req, res) {
  const { nomeModalidade } = req.body;
  const result = await modalidadesService.create(nomeModalidade);
  res.status(201).json({ result });
}

