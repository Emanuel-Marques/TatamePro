import cobrancasService from "./cobrancas.service.js";
import matriculasService from "../matriculas/matriculas.service.js";

async function getByMatricula(req, res){
    const { matriculaId } = req.params;
    if (!matriculaId || Number.isNaN(matriculaId)) {
        return res.status(400).json({ message: "id da matricula inexistente!" });
    }
    const matricula = await matriculasService.getById(matriculaId);
    if(!matricula || matricula.length == 0){
        return res.status(400).json({ message: "Matricula inexistente!" });
    }

    const result = await cobrancasService.getByMatricula(matriculaId);
    if(result.length == 0){
        return res.status(404).json({ message: "Cobranças não encontradas!" });
    }
    res.status(200).json({data: result});
}

export default {
    getByMatricula
}