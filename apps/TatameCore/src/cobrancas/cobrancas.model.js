import { connection } from '../database/config.js';
async function create( matriculaId, valor, dataVencimento ){
    const query = `
        INSERT INTO cobrancas (matricula_id, valor, data_vencimento, estado)
        VALUES (?, ?, ?, 'Pendente')
        ON DUPLICATE KEY UPDATE estado = 'Pendente', valor = VALUES(valor)
    `;
    try {
        const [result] = await connection.execute(query, [matriculaId, valor, dataVencimento]);
        return result;
    } catch (error) {
        console.log('Erro ao gerar cobrança: ', error);
    }
}

async function getByMatriculaEData( matriculaId, dataVencimento ){
    const query = `
        SELECT * FROM cobrancas 
        WHERE matricula_id = ? AND data_vencimento = ?
    `;
    try {
        const [result] = await connection.execute(query, [matriculaId, dataVencimento]);
        return result;
    } catch (error) {
        console.log('Erro ao buscar cobrança pela matricula e data de vencimento: ', error);
    }
}

async function getUltimaCobranca(matriculaId) {
    try {
        const [ultimaCobranca] = await connection.execute(`
            SELECT * FROM cobrancas 
            WHERE matricula_id = ? AND estado = 'Pendente' 
            ORDER BY data_vencimento DESC 
            LIMIT 1
        `, [matriculaId]);
    
        return ultimaCobranca.length > 0 ? ultimaCobranca[0] : null;
    } catch (error) {
        console.log('Erro ao buscar última cobrança: ', error);
    }
    
}

async function getById(cobrancaId){
    const query = `
    SELECT * FROM cobrancas 
    WHERE cobranca_id = ?
`;
try {
    const [result] = await connection.execute(query, [cobrancaId]);
    return result;
} catch (error) {
    console.log('Erro ao buscar cobrança pelo id: ', error);
} 
}

async function updateEstadoDaCobranca(cobrancaId, estado){
    const query = `
    UPDATE cobrancas SET estado = ?
    WHERE cobranca_id = ?;
    `;
  try {
    const [result] = await connection.query(query, [cobrancaId, estado]);
    return result;
  } catch (error) {
    console.error('Erro ao actualizar estado da cobrança: ', error);
  }
}

export default {
    create,
    getByMatriculaEData,
    getUltimaCobranca,
    getById,
    updateEstadoDaCobranca
}