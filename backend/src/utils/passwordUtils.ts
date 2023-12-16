import crypto from 'crypto';

const validPassword = (password: string, hashedPassword: string) => {
  const [salt, hash] = hashedPassword.split('.');

  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return hash === hashVerify;
}

const genPassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString('hex');

  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return `${salt}.${genHash}`;
}

export const passwordUtils = { validPassword, genPassword};