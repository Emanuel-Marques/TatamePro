import cobrancasModel from "./cobrancas.model.js";

async function create(matriculaId, valor, dataVencimento, estado){
    const result = await cobrancasModel.create(matriculaId, valor, dataVencimento, estado);
    return result;
}

export default {
    create
}