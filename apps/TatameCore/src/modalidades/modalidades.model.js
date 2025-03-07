import { connection } from "../database/config";

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
      console.error('Erro ao buscar modalidade: ', error);
    }
}


export default {
  create,
  getAll,
  getById
};
