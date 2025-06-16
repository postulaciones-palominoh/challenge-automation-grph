import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { encryptSecret } from '../utils/encrypt'; 
import { log } from '../utils/loggers';

dotenv.config();

const secret = process.env.SECRET_KEY || '';
const encryptedSecret = encryptSecret(secret); 

export const test = base.extend<{ encryptedSecret: string }>({
  encryptedSecret: async ({}, use) => {
    log(`🔐 Clave secreta encriptada: ${encryptedSecret}`);
    await use(encryptedSecret);
  },
});

export { expect };