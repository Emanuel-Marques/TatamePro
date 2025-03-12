import { connection } from "../database/config.js";

async function create(cobrancaId, metodoDePagamento, valorPago){
    const query = `
        INSERT INTO pagamentos (cobranca_id, metodo_pagamento, valor_pago)
        VALUES(?, ?, ?)
    `
    try {
        const [result] = await connection.execute(query, [cobrancaId, metodoDePagamento, valorPago]);
        return result;
    } catch (error) {
        console.log('Erro ao criar um pagamento: ', error);
        console.error(error);
    }
}

async function getAll(){
    const query = `
        SELECT * FROM pagamentos
    `
    try {
        const [result] = await connection.execute(query);
        return result;
    } catch (error) {
        console.log('Erro ao buscar pagamentos: ', error);
        console.error(error);
    }
}

async function getById(pagamentoId){
    const query = `
        SELECT * FROM pagamentos
        WHERE pagamento_id = ?
    `
    try {
        const [result] = await connection.execute(query,[pagamentoId]);
        return result;
    } catch (error) {
        console.log('Erro ao buscar pagamento pelo id: ', error);
        console.error(error);
    }
}

async function update(cobrancaId, metodoDePagamento, valorPago, pagamentoId){
    const query = `
        UPDATE pagamentos SET cobrancaId = ?, metodo_pagamento = ?, valor_pago = ?
        WHERE pagamento_id = ?;
    `
    try {
        const [result] = await connection.execute(query,[cobrancaId, metodoDePagamento, valorPago, pagamentoId]);
        return result;
    } catch (error) {
        console.log('Erro ao buscar pagamento pelo id: ', error);
        console.error(error);
    }
}

async function deletePagamento(pagamentoId){
    const query = `
        DELETE FROM pagamentos 
        WHERE pagamento_id = ?;
    `
    try {
        const [result] = await connection.execute(query,[pagamentoId]);
        return result;
    } catch (error) {
        console.log('Erro ao buscar pagamento pelo id: ', error);
        console.error(error);
    }
}

export default {
    create,
    getAll,
    getById,
    update,
    deletePagamento
}