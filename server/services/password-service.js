const crypto = require('crypto');

// Generate Salt
const genRandomString = (length) => crypto.randomBytes(Math.ceil(length/2))
  .toString('hex')
  .slice(0, length);

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
}

const hashPassword = (userPassword, salt = genRandomString(16)) => {
  const password = sha512(userPassword, salt);
  return { password, salt };
}

module.exports = {
  hashPassword,
};