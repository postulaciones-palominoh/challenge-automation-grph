import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { encryptSecret } from '../utils/encrypt'; // 👈 importa la función

dotenv.config();

const secret = process.env.SECRET_KEY || '';
const encryptedSecret = encryptSecret(secret); // 👈 usa la función importada

export const test = base.extend<{ encryptedSecret: string }>({
  encryptedSecret: async ({}, use) => {
    console.log(`🔐 Clave secreta encriptada: ${encryptedSecret}`);
    await use(encryptedSecret);
  },
});

export { expect };