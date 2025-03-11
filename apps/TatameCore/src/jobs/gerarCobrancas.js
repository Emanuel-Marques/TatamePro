import cobrancasService from '../cobrancas/cobrancas.service.js';
import matriculasService from '../matriculas/matriculas.service.js';
import planosService from '../planos/planos.service.js';
export async function gerarCobrancas(){
    const matriculas = await matriculasService.getMatriculasActivas();
    
    for(let matricula of matriculas){
        const { matricula_id, plano_id, data_inicio } = matricula;

        const plano = await planosService.getById(plano_id);
        
        if(!plano || plano.length === 0) continue;

        const valorMensalidade = plano[0].valor_mensalidade;
        const duracaoMeses = plano[0].duracao_meses;

        
        const ultimaCobranca = await cobrancasService.getUltimaCobranca(matricula_id);
    
        let proximaDataVencimento;
        let dataVencimento;

        if (ultimaCobranca) {
            proximaDataVencimento = new Date(ultimaCobranca.data_vencimento);
            dataVencimento = new Date(ultimaCobranca.data_vencimento);
        } else {
            proximaDataVencimento = new Date(data_inicio);
            dataVencimento = new Date(data_inicio);
        }
        
        proximaDataVencimento.setMonth(proximaDataVencimento.getMonth() + duracaoMeses);

        const hoje = new Date();

        if (hoje >= dataVencimento) {
            const { insertId } = await cobrancasService.create(matricula_id, valorMensalidade, proximaDataVencimento);
            console.log(`Cobrança ${insertId} criada para matrícula ${matricula_id}, vencendo em ${proximaDataVencimento.toISOString().split('T')[0]}`);
        } else {
            console.log(`Ainda não é hora de criar nova cobrança para matrícula ${matricula_id}`);
        }
    }
}