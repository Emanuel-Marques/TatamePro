import cobrancasModel from "./cobrancas.model.js";

async function create(matriculaId, valor, dataVencimento){
    const result = await cobrancasModel.create(matriculaId, valor, dataVencimento);
    return result;
}

async function getByMatriculaEData(matriculaId, dataVencimento){
    const result = await cobrancasModel.getByMatriculaEData(matriculaId, dataVencimento);
    return result; 
}

async function getByMatricula( matriculaId ){
    const result = await cobrancasModel.getByMatricula(matriculaId);
    return result; 
}

async function getUltimaCobranca(matriculaId){
    const result = await cobrancasModel.getUltimaCobranca(matriculaId);
    return result;
}

async function getById(cobrancaId){
    const result = await cobrancasModel.getById(cobrancaId);
    return result;
}

async function updateEstadoDaCobranca(cobrancaId, estado){
    const result = await cobrancasModel.updateEstadoDaCobranca(cobrancaId, estado);
    return result; 
}

export default {
    create,
    getByMatriculaEData,
    getUltimaCobranca,
    getById,
    updateEstadoDaCobranca,
    getByMatricula
}