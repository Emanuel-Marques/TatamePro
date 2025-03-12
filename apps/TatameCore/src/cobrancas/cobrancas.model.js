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

async function getByMatricula( matriculaId ){
    const query = `
        SELECT cobrancas.cobranca_id, cobrancas.valor, cobrancas.data_vencimento, cobrancas.estado, matriculas.matricula_id, alunos.aluno_id, alunos.nome FROM cobrancas 
        INNER JOIN matriculas ON cobrancas.matricula_id = matriculas.matricula_id
        INNER JOIN alunos ON matriculas.aluno_id = alunos.aluno_id
        WHERE cobrancas.matricula_id = ?
    `;
    try {
        const [result] = await connection.execute(query, [matriculaId]);
        return result;
    } catch (error) {
        console.log('Erro ao buscar cobranças pela matricula: ', error);
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
    const [result] = await connection.query(query, [estado, cobrancaId]);
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
    updateEstadoDaCobranca,
    getByMatricula
}