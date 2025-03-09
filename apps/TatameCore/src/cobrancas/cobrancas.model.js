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

export default {
    create,
    getByMatriculaEData
}