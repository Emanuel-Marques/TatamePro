import { connection } from "../database/config";

export async function create(aluno) {
  const {
    utilizadorId,
    modalidadeId,
    nome,
    numeroBI,
    dataNascimnto,
    nomePai,
    nomeMae,
    endereco,
    genero,
    telefone,
    email,
    bolseiro,
  } = aluno; 
  
  const query = `
    INSERT INTO alunos (utilizador_id, modalidade_id, nome, numero_bi, data_nascimento, nome_pai, nome_mae, endereco, genero,telefone, email, bolseiro, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ON DUPLICATE KEY UPDATE created_at = NOW();
    `;
  try {
    const [result] = await connection.query(query, [ utilizadorId,
        modalidadeId,
        nome,
        numeroBI,
        dataNascimnto,
        nomePai,
        nomeMae,
        endereco,
        genero,
        telefone,
        email,
        bolseiro]);
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar o aluno :", error);
  }
}
