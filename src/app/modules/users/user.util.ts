import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: object,
    secret: Secret,
    expiresIn: string 
) => {
    
    return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
}