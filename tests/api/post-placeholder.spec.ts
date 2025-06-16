import { test, expect } from '../../fixtures/secret.fixture';
import { log } from '../../utils/loggers';

test('POST jsonplaceholder', async ({ encryptedSecret }) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
  });

  const json = await response.json();

  expect(response.status).toBe(201);
  expect(json).toHaveProperty('id');

  log(`✅ Test finalizado a las ${new Date().toLocaleString()}`);
});