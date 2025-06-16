import crypto from 'crypto';

export function encryptSecret(secret: string): string {
  return crypto.createHash('sha256').update(secret).digest('hex');
}