import { test, expect } from '../../fixtures/secret.fixture';
import { log } from '../../utils/loggers';

test('POST jsonplaceholder', async ({ encryptedSecret }) => {
  const payload = {
    title: 'foo',
    body: 'bar',
    userId: 1
  };

  log(`📤 Enviando POST con payload: ${JSON.stringify(payload)}`);

  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  expect(response.status).toBe(201);
  expect(json).toHaveProperty('id');

  log(`📥 Respuesta recibida: ${JSON.stringify(json)}`);
  log(`✅ Test POST finalizado a las ${new Date().toLocaleString()}`);
});