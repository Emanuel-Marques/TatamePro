import professoresService from "./professores.service.js";
import camelize from "camelize";

async function create(req, res) {
  const { utilizadorId, nome, especialidade, telefone, grau } = req.body;
  if (!nome || !especialidade || !telefone || !grau ) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios!" });
  }
  const professor = { utilizadorId, nome, especialidade, telefone, grau };
  const { insertId } = await professoresService.create(professor);
  res.status(201).json({ insertId });
}

async function getAll(req, res) {
  const result = await professoresService.getAll();
  res.status(200).json({ data: camelize(result) });
}

async function getById(req, res) {
  const { professorId } = req.params;

  if (!professorId || Number.isNaN(professorId)) {
    return res.status(400).json({ message: "id do professor inexistente!" });
  }

  const result = await professoresService.getById(professorId);

  if (result.length == 0) {
    return res.status(404).json({ message: "professor não encontrado!" });
  }

  res.status(200).json({ data: camelize(result) });
}

async function update(req, res) {
  const { professorId } = req.params;
  const { utilizadorId, nome, especialidade, telefone, grau, estado } = req.body;

  if (!professorId || Number.isNaN(professorId) || !nome || !especialidade || !telefone || !grau || !estado) {
    return res.status(400).json({ message: "id ou campos inexistentes!" });
  }

  const professor = await professoresService.getById(professorId);
  if (professor.length == 0) {
    return res.status(404).json({ message: "professor não encontrado!" });
  }

  const result = await professoresService.update(professorId, utilizadorId, nome, especialidade, telefone, grau, estado);

  res.status(204).json();
}

async function deleteProfessor(req, res) {
    const { professorId } = req.params;
  
    if (!professorId || Number.isNaN(professorId) ) {
      return res.status(400).json({ message: "id inexistente!" });
    }
  
    const professor = await professoresService.getById(professorId);

    if (professor.length == 0) {
      return res.status(404).json({ message: "Professor não encontrado!" });
    }
  
    const result = await professoresService.deleteProfessor(professorId);
  
    res.status(204).json();
  }

export default {
  create,
  getAll,
  getById,
  update,
  deleteProfessor
};