const bcrypt = require('bcrypt');


class AuthHelper {
    static async constructUserCreationPayload(data) {
        const passwordHash = await bcrypt.hash(data.password, 10);
        return {
            name: data.name,
            password: passwordHash,
            email_id: data.email_id,
            phone_no: data.phone_no,
            last_login_at: null,
        };
    }

    static isPasswordMatch(plainText, cipherText) {
        return bcrypt.compare(plainText, cipherText);
    }
}

module.exports = AuthHelper;