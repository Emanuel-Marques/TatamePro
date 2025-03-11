import cobrancasModel from "./cobrancas.model.js";

async function create(matriculaId, valor, dataVencimento){
    const result = await cobrancasModel.create(matriculaId, valor, dataVencimento);
    return result;
}

async function getByMatriculaEData(matriculaId, dataVencimento){
    const result = await cobrancasModel.getByMatriculaEData(matriculaId, dataVencimento);
    return result; 
}

async function getUltimaCobranca(matriculaId){
    const result = await cobrancasModel.getUltimaCobranca(matriculaId);
    return result;
}

export default {
    create,
    getByMatriculaEData,
    getUltimaCobranca
}