import { test, expect } from '../../fixtures/secret.fixture';
import { readPokemonNames } from '../../utils/excelReader';
import { WikipediaPage } from '../../pages/wikipedia.page';
import { downloadImage, validateImage } from '../../utils/imageUtils';

const pokemons = readPokemonNames('data/Challenge automation - Datos-pruebas.xlsx');

for (const name of pokemons) {
  test(`Wikipedia - ${name}`, async ({ page, encryptedSecret }) => {
    const wiki = new WikipediaPage(page);
    await wiki.goto(name);

    const title = await wiki.getTitle();
    expect(title.toLowerCase()).toContain(name.toLowerCase());

    const author = await wiki.getAuthor();
    console.log(`✍️ Autor del dibujo: ${author}`);

    const imageUrl = await wiki.getImageUrl();
    const filePath = `images/${name}.jpg`;
    await downloadImage(imageUrl, filePath);
    await validateImage(filePath);

    console.log(`✅ Test finalizado a las ${new Date().toLocaleString()}`);
  });
}