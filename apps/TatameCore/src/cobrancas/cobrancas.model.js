import { connection } from '../database/config.js';
async function create( matriculaId, valor, dataVencimento, estado ){
    const query = `
        INSERT INTO cobrancas (matricula_id, valor, data_vencimento, estado)
        VALUES (?, ?, ?, ?)
    `;
    try {
        const [result] = await connection.execute(query, [matriculaId, valor, dataVencimento, estado]);
        return result;
    } catch (error) {
        console.log('Erro ao gerar cobrança: ', error);
    }
}

export default {
    create
}