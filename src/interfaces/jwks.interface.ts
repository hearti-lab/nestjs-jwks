export interface Jwks {
    kid: string;
    publicKey: string;
}

export interface Jwk {
    use: string;
    kty: string;
    kid: string;
    alg: string;
    n: string;
    e: string;
}
