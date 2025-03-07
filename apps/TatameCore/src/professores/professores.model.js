import { connection } from "../database/config.js";

async function create({ utilizadorId, nome, especialidade }) {
  const query = `
    INSERT INTO professores (utilizador_id, nome, especialidade) 
    VALUES (?, ?, ?);
    `;
  try {
    const [result] = await connection.query(query, [utilizadorId, nome, especialidade]);
    return result;
  } catch (error) {
    console.error('Erro ao cadastrar professor: ', error);
  }
}

async function getAll() {
    const query = `
      SELECT * FROM professores;
      `;
    try {
      const [result] = await connection.query(query);
      return result;
    } catch (error) {
      console.error('Erro ao buscar professores: ', error);
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
      console.error('Erro ao buscar professor pelo id: ', error);
    }
}

async function update(professorId, utilizadorId, nome, especialidade) {
    const query = `
      UPDATE professores SET nome = ?, especialidade = ?, utilizador_id = ?  
      WHERE professor_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [nome, especialidade, utilizadorId, professorId]);
      return result;
    } catch (error) {
      console.error('Erro ao actualizar dados do professor: ', error);
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
      console.error('Erro ao apagar dados do professor: ', error);
    }
}


export default {
  create,
  getAll,
  getById,
  update,
  deleteProfessor
};
