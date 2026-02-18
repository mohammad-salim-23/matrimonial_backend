import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.join(process.cwd(),'.env')});

export default {
    NODE_ENV: process.env.NODE_ENV,
    port :process.env.PORT,
    databaseUrl:process.env.DATABASE_URL,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_access_expires_in:process.env.JWT_ACCESS_EXPIRES_IN,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    EMAIL_SERVICE:process.env.EMAIL_SERVICE,
}