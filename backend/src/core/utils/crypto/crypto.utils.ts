import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

// ✅ Salt para hashing (costo ajustable vía .env)
const SALT_ROUNDS = 10;

/**
 * Hashea una contraseña (para almacenar en BD)
 */
export const hashPassword = async (password: string): Promise<string> => 
  bcrypt.hash(password, SALT_ROUNDS);

/**
 * Verifica una contraseña contra su hash
 */
export const comparePassword = async (password: string, hash: string): Promise<boolean> => 
  bcrypt.compare(password, hash);

/**
 * Cifra datos sensibles (ej: tokens de pago)
 */
export const encrypt = (data: string, key: string): string => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}:${cipher.getAuthTag().toString('hex')}`;
};

/**
 * Descifra datos (usado en servicios con ConfigService)
 */
export const decrypt = (encryptedData: string, key: string): string => {
  const [iv, content, authTag] = encryptedData.split(':');
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    Buffer.from(iv, 'hex')
  );
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  return decipher.update(content, 'hex', 'utf8') + decipher.final('utf8');
};