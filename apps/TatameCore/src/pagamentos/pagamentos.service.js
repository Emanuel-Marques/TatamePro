import cobrancasService from "../cobrancas/cobrancas.service.js";
import pagamentosModel from "./pagamentos.model.js";

async function create(cobrancaId, metodoDePagamento, valorPago){
    const cobranca = await cobrancasService.updateEstadoDaCobranca(cobrancaId, 'Pago');
    const result = await pagamentosModel.create(cobrancaId, metodoDePagamento, valorPago);
    return result;
}

async function getAll() {
    const result = await pagamentosModel.getAll();
    return result;
}

async function getById(pagamentoId) {
    const result = await pagamentosModel.getById(pagamentoId);
    return result;
}

async function update(cobrancaId, metodoDePagamento, valorPago, pagamentoId) {
    const result = await pagamentosModel.update(cobrancaId, metodoDePagamento, valorPago, pagamentoId);
    return result;
}

async function deletePagamento(pagamentoId) {
    const result = await pagamentosModel.deletePagamento(pagamentoId);
    return result;
}

export default {
    create,
    getById,
    getAll,
    deletePagamento,
    update
}