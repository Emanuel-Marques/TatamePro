import { connection } from './config.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

async function initDB() {
    try {
        await connection.query(sql);
        console.log('Banco de dados inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao executar script SQL:', error);
    } finally {
        await connection.end();
    }
}

initDB();