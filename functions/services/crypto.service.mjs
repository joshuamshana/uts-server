import crypto from 'crypto';

export class CryptoService {
    static hash(data) {
        data = JSON.stringify(data).trim();
        return crypto.createHash('SHA1',)
            .update(data)
            .digest('hex').toString();
    }
}
