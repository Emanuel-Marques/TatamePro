import { connection } from "../database/config.js";

async function create({ alunoId, planoId, dataInicio, estado }) {
  const query = `
    INSERT INTO matriculas (aluno_id, plano_id, data_inicio, estado) 
    VALUES (?, ?, ?, ?);
    `;
  try {
    const [result] = await connection.query(query, [alunoId, planoId, dataInicio, estado]);
    return result;
  } catch (error) {
    console.error('Erro ao efcetuar matricula: ', error);
  }
}

async function getAll() {
    const query = `
      SELECT * FROM matriculas;
      `;
    try {
      const [result] = await connection.query(query);
      return result;
    } catch (error) {
      console.error('Erro ao buscar matriculas: ', error);
    }
}


async function getById(matriculaId) {
    const query = `
      SELECT * FROM matriculas 
      WHERE matricula_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [matriculaId]);
      return result;
    } catch (error) {
      console.error('Erro ao buscar matricula pelo id: ', error);
    }
}

async function update(matriculaId, alunoId, planoId, dataInicio, estado) {
    const query = `
      UPDATE matriculas SET aluno_id = ?, plano_id = ?, data_inicio = ?, estado = ?  
      WHERE matricula_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [alunoId, planoId, dataInicio, estado, matriculaId]);
      return result;
    } catch (error) {
      console.error('Erro ao actualizar matricula: ', error);
    }
}

async function deleteMatricula(matriculaId) {
    const estado = 'Cancelada';
    const query = `
      UPDATE matriculas SET estado = ? 
      WHERE matricula_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [estado, matriculaId]);
      return result;
    } catch (error) {
      console.error('Erro ao apagar matricula: ', error);
    }
}


export default {
  create,
  getAll,
  getById,
  update,
  deleteMatricula
};
