import { connection } from "../database/config.js";

async function create(nomeModalidade) {
  const query = `
    INSERT INTO modalidades (nome_modalidade) 
    VALUES (?);
    `;
  try {
    const [result] = await connection.query(query, [nomeModalidade]);
    return result;
  } catch (error) {
    console.error('Erro ao cadastrar modalidade: ', error);
  }
}

async function getAll() {
    const query = `
      SELECT *  FROM modalidades;
      `;
    try {
      const [result] = await connection.query(query);
      return result;
    } catch (error) {
      console.error('Erro ao buscar modalidade: ', error);
    }
}


async function getById(modalidadeId) {
    const query = `
      SELECT *  FROM modalidades 
      WHERE modalidade_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [modalidadeId]);
      return result;
    } catch (error) {
      console.error('Erro ao buscar modalidade pelo id: ', error);
    }
}

async function update(modalidadeId, nomeModalidade) {
    const query = `
      UPDATE modalidades SET nome_modalidade = ?  
      WHERE modalidade_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [nomeModalidade,modalidadeId]);
      return result;
    } catch (error) {
      console.error('Erro ao actualizar modalidade: ', error);
    }
}

async function deleteModalidade(modalidadeId) {
    const query = `
      DELETE FROM modalidades 
      WHERE modalidade_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [modalidadeId]);
      return result;
    } catch (error) {
      console.error('Erro ao deletar modalidade: ', error);
    }
}


export default {
  create,
  getAll,
  getById,
  update,
  deleteModalidade
};
