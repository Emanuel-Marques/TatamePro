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

        // Definir a data de vencimento para o próximo mês
        const hoje = new Date();
        const mesAtual = hoje.getMonth() + 1; 
        const anoAtual = hoje.getFullYear();
        const dataVencimento = new Date(anoAtual, mesAtual, data_inicio.getDate());

        
        const cobrancaExistente = await cobrancasService.getByMatriculaEData(matricula_id, dataVencimento);
        if (cobrancaExistente == 0) {
            
            const { insertId } = await cobrancasService.create(matricula_id, valorMensalidade, dataVencimento);
            console.log(`Cobrança ${insertId} criada para matrícula ${matricula_id}!`);
        } else {
            console.log(`Cobrança já existe para matrícula ${matricula_id} na data ${dataVencimento.toISOString().split('T')[0]}`);
        }
    }
}