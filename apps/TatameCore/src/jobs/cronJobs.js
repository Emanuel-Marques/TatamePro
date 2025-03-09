import cron from 'node-cron';
import { gerarCobrancas } from './gerarCobrancas.js';

cron.schedule('* 2 * * *', async ()=> {
    try {
        console.log("INÍCIO: gerar cobrancas...");
        await gerarCobrancas();
        console.log("FIM: gerar cobrancas...");
    } catch (error) {
        console.log("Erro ao gerar cobranças: ", error);
    }
});