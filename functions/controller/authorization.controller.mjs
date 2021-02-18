import nodeJwk from 'node-jwk';
import njwt from 'njwt';

export class AuthorizationController {
    /**
     *
     * @param host {string}
     * @param keyPair {*}
     * @return {*}
     */
    getToken(keyPair, host = 'https://utsserver-faas.bfast.fahamutech.com') {
        const time = Math.floor(new Date().getTime() / 1000);
        const claims = {
            iss: host,
            sub: host,
            aud: host,
            iat: time,
            exp: time + 3600
        };
        const jwk = this.getJwk(keyPair);
        const keyPEM = jwk.key.toPrivateKeyPEM();
        const jwt = njwt.create(claims, keyPEM, jwk.alg);
        return jwt.compact();
    }

    /**
     *
     * @param token {string}
     * @param publicKey {*}
     * @return {JwtBody}
     */
    verifyToken(token, publicKey) {
        const jwk = this.getJwk(publicKey);
        const jwt = njwt.verify(token, jwk.key.toPublicKeyPEM(), jwk.alg);
        return jwt.body;
    }

    /**
     *
     * @param keyPair {*}
     * @return {JWK}
     */
    getJwk(keyPair) {
        const jwk = nodeJwk.JWK.fromObject(keyPair);
        if (!jwk) {
            throw new Error('Huh, my key is not there...');
        }
        return jwk;
    }
}

