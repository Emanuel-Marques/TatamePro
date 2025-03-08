import { connection } from "../database/config.js";

async function create(aluno) {
  const {
    utilizadorId,
    modalidadeId,
    nome,
    numeroBI,
    dataNascimento,
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
    const [result] = await connection.query(query, [
      utilizadorId,
      modalidadeId,
      nome,
      numeroBI,
      dataNascimento,
      nomePai,
      nomeMae,
      endereco,
      genero,
      telefone,
      email,
      bolseiro,
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar o aluno :", error);
  }
}

async function getAll() {
  const query = `
    SELECT * FROM alunos;
    `;
  try {
    const [result] = await connection.query(query);
    return result;
  } catch (error) {
    console.error("Erro ao buscar alunos: ", error);
  }
}

async function getById(alunoId) {
  const query = `
    SELECT * FROM alunos 
    WHERE aluno_id = ?;
    `;
  try {
    const [result] = await connection.query(query, [alunoId]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar aluno pelo id: ", error);
  }
}

async function update(alunoId, utilizadorId, modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
  nomeMae, endereco, genero, telefone, email, bolseiro) {
  const query = `
    UPDATE alunos SET utilizador_id = ?, modalidade_id = ?, nome = ?, numero_bi = ?, 
    data_nascimento = ?, nome_pai = ?, nome_mae = ?, endereco = ?, genero = ?, telefone = ?,
    email = ?, bolseiro = ?  
    WHERE aluno_id = ?;
    `;
  try {
    const [result] = await connection.query(query, [
      utilizadorId, modalidadeId, nome, numeroBI, dataNascimento, nomePai, 
      nomeMae, endereco, genero, telefone, email, bolseiro, alunoId,
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao actualizar dados do professor: ", error);
  }
}

async function deleteAluno(alunoId) {
  const query = `
    DELETE FROM aluno 
    WHERE aluno_id = ?;
    `;
  try {
    const [result] = await connection.query(query, [alunoId]);
    return result;
  } catch (error) {
    console.error("Erro ao apagar dados do aluno: ", error);
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteAluno,
};
