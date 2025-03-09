import cron from 'node-cron';
import { gerarCobrancas } from './gerarCobrancas.js';

cron.schedule('* * * * *', async ()=> {
    try {
        console.log("Gerando cobrancas...");
        await gerarCobrancas();
    } catch (error) {
        console.log("Erro ao gerar cobranças: ", error);
    }
});