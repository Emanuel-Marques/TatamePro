import { connection } from "../database/config.js";

async function create({ utilizadorId, nome, especialidade, telefone, grau }) {
  const query = `
    INSERT INTO professores (utilizador_id, nome, especialidade, telefone, grau) 
    VALUES (?, ?, ?, ?, ?);
    `;
  try {
    const [result] = await connection.query(query, [
      utilizadorId,
      nome,
      especialidade,
      telefone, 
      grau
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar professor: ", error);
  }
}

async function getAll() {
  const query = `
      SELECT professores.professor_id, utilizadores.email, professores.estado, professores.especialidade, professores.data_inicio, professores.grau, professores.telefone FROM professores 
      INNER JOIN utilizadores ON professores.utilizador_id = utilizadores.utilizador_id
      `;
  try {
    const [result] = await connection.query(query);
    return result;
  } catch (error) {
    console.error("Erro ao buscar professores: ", error);
  }
}

async function getById(professorId) {
  const query = `
      SELECT *  FROM professores 
      WHERE professor_id = ?;
      `;
  try {
    const [result] = await connection.query(query, [professorId]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar professor pelo id: ", error);
  }
}

async function update(professorId, utilizadorId, nome, especialidade, telefone, grau, estado) {
  const query = `
      UPDATE professores SET nome = ?, especialidade = ?, utilizador_id = ?, telefone = ?, grau = ?, estado = ?  
      WHERE professor_id = ?;
      `;
  try {
    const [result] = await connection.query(query, [
      nome,
      especialidade,
      utilizadorId,
      telefone, 
      grau, 
      estado,
      professorId,
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao actualizar dados do professor: ", error);
  }
}

async function deleteProfessor(professorId) {
  const query = `
      DELETE FROM professores 
      WHERE professor_id = ?;
      `;
  try {
    const [result] = await connection.query(query, [professorId]);
    return result;
  } catch (error) {
    console.error("Erro ao apagar dados do professor: ", error);
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteProfessor,
};
