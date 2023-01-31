const { rejects } = require('assert');
const crypto = require('crypto');

module.exports =
{
	//signup
	encryptPassword: async (password) => {
		return new Promise(async (resolve, rejects) => {
			try {
				const salt = (await crypto.randomBytes(32)).toString('hex');
				crypto.pbkdf2(password, salt.toString(), 1, 32, 'sha512', (err, deriveKey) => {
					if (err) throw err;
					const hashed = deriveKey.toString('hex');
					resolve({ salt, hashed });
				});
			} catch (err) {
				console.log(err);
				rejects(err);
			}
		})
	},

	//signin
	encryptForLogin: async (__Password, __salt) => {
		return new Promise(async (resolve, rejects) => {
			try {
				crypto.pbkdf2(__Password, __salt, 1, 32, 'sha512', (err, deriveKey) => {
					if (err) throw err;
					const hashed = deriveKey.toString('hex');
					resolve(hashed);
				})
			} catch (err) {
				console.log(err);
				rejects(err);
			}
		})
	}
}
