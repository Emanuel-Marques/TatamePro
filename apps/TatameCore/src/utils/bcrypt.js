import "dotenv/config";
import bcrypt from 'bcrypt';

export async function encryptPassword(password){
    const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export async function checkPassword(password, hash){
    return await bcrypt.compare(password, hash);
}

