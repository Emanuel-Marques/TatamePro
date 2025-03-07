import { connection } from "../database/config.js";

async function create({ nomePlano, valorMensalidade, duracaoMeses }) {
  const query = `
    INSERT INTO planos_de_mensalidades (nome_plano, valor_mensalidade, duracao_meses) 
    VALUES (?, ?, ?);
    `;
  try {
    const [result] = await connection.query(query, [nomePlano, valorMensalidade, duracaoMeses]);
    return result;
  } catch (error) {
    console.error('Erro ao cadastrar plano: ', error);
  }
}

async function getAll() {
    const query = `
      SELECT *  FROM planos_de_mensalidades;
      `;
    try {
      const [result] = await connection.query(query);
      return result;
    } catch (error) {
      console.error('Erro ao buscar planos: ', error);
    }
}


async function getById(planoId) {
    const query = `
      SELECT *  FROM planos_de_mensalidades 
      WHERE plano_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [planoId]);
      return result;
    } catch (error) {
      console.error('Erro ao buscar plano pelo id: ', error);
    }
}

async function update(planoId, nomePlano, valorMensalidade, duracaoMeses) {
    const query = `
      UPDATE planos_de_mensalidades SET nome_plano = ?, valor_mensalidade = ?, duracao_meses = ?  
      WHERE plano_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [nomePlano, valorMensalidade, duracaoMeses, planoId]);
      return result;
    } catch (error) {
      console.error('Erro ao actualizar plano: ', error);
    }
}

async function deletePlano(planoId) {
    const query = `
      DELETE FROM planos_de_mensalidades 
      WHERE plano_id = ?;
      `;
    try {
      const [result] = await connection.query(query, [planoId]);
      return result;
    } catch (error) {
      console.error('Erro ao apagar plano: ', error);
    }
}


export default {
  create,
  getAll,
  getById,
  update,
  deletePlano
};
