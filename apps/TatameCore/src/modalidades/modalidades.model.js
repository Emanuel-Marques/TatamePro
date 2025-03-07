import { connection } from "../database/config";

async function create(nomeModalidade) {
  const query = `
    INSERT INTO alunos (nome_modalidade) 
    VALUES (?);
    `;
  try {
    const [result] = await connection.query(query, [nomeModalidade]);
    return result;
  } catch (error) {
    console.error('Erro ao cadastrar modalidade: ', error);
  }
}

export default {
  create,
};
