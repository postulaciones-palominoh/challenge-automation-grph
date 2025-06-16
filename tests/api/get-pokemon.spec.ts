import { test, expect } from '../../fixtures/secret.fixture';
import { readPokemonData } from '../../utils/excelReader';
import { log } from '../../utils/loggers';

const data = readPokemonData('data/Challenge automation - Datos-pruebas.xlsx');

for (const value of data) {
  test(`GET Pokémon ${value}`, async ({ encryptedSecret }) => {
    const start = Date.now();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(10_000);

    const json = await response.json();

    //Validaciones
    expect(json).toHaveProperty('id');
    expect(json).toHaveProperty('name');
    expect(json).toHaveProperty('abilities');

    //Logueo de datos validados
    const abilities = json.abilities.map((a: any) => a.ability.name).join(', ');
    log(`🔎 Pokémon: ID=${json.id}, Name=${json.name}, Abilities=${abilities}`);
    log(`⏱️  Tiempo de respuesta: ${duration} ms`);
    log(`✅ Test finalizado para ${value} a las ${new Date().toLocaleString()}`);
  });
}
