import { connection } from "../database/config.js";

async function create({ nome, email, senha, perfil }) {
  const query = `
    INSERT INTO utilizadores (nome, email, senha, perfil) 
    VALUES (?, ?, ?, ?);
    `;
  try {
    const [result] = await connection.query(query, [
      nome,
      email,
      senha,
      perfil,
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar utilizador: ", error);
  }
}

async function getAll() {
  const query = `
      SELECT *  FROM utilizadores;
      `;
  try {
    const [result] = await connection.query(query);
    return result;
  } catch (error) {
    console.error("Erro ao buscar utilizadores: ", error);
  }
}

async function getById(utilizadorId) {
  const query = `
      SELECT *  FROM utilizadores 
      WHERE utilizador_id = ?;
      `;
  try {
    const [result] = await connection.query(query, [utilizadorId]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar utilizador pelo id: ", error);
  }
}

async function update(utilizadorId, nome, email, senha, perfil) {
  const query = `
      UPDATE utilizadores SET nome = ?, email = ?, senha = ?, perfil = ?  
      WHERE utilizador_id = ?;
      `;
  try {
    const [result] = await connection.query(query, [
      nome,
      email,
      senha,
      perfil,
      utilizadorId,
    ]);
    return result;
  } catch (error) {
    console.error("Erro ao actualizar utilizador: ", error);
  }
}

async function deleteUtilizador(utilizadorId) {
  const query = `
      DELETE FROM utilizadores 
      WHERE utilizador_id = ?;
      `;
  try {
    const [result] = await connection.query(query, [utilizadorId]);
    return result;
  } catch (error) {
    console.error("Erro ao apagar utilizador: ", error);
  }
}

async function getByEmail(email) {
  const query = `
      SELECT * FROM utilizadores 
      WHERE email = ?;
      `;
  try {
    const [result] = await connection.query(query, [email]);
    return result;
  } catch (error) {
    console.error("Erro ao buscar utilizador pelo email: ", error);
  }
}

export default {
  create,
  getAll,
  getById,
  update,
  deleteUtilizador,
  getByEmail,
};
