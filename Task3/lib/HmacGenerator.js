// HmacGenerator.js
import crypto from 'crypto';

class HmacGenerator {
    generateSecretKey() {
        return crypto.randomBytes(32); // 256-bit key
    }

    generateHmac(key, message) {
        return crypto.createHmac('sha256', key).update(message).digest('hex');
    }
}

export default HmacGenerator;
