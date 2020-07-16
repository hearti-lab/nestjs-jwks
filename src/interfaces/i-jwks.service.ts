import { Secret } from 'jsonwebtoken';

export interface IJwksService {
    getJwtSecret(token: string): Secret;
}
