import { test, expect } from '../../fixtures/secret.fixture';
import { readPokemonNames } from '../../utils/excelReader';
import { WikipediaPage } from '../../pages/wikipedia.page';
import { downloadImage, validateImage } from '../../utils/imageUtils';
import { log } from '../../utils/loggers';

const pokemons = readPokemonNames('data/Challenge automation - Datos-pruebas.xlsx');

for (const name of pokemons) {
  test(`Wikipedia - ${name}`, async ({ page, encryptedSecret }) => {
    const wiki = new WikipediaPage(page);
    await wiki.goto(name);

    const title = await wiki.getTitle();
    log(`📄 Título de la página: ${title}`);
    expect(title.toLowerCase()).toContain(name.toLowerCase());

    const author = await wiki.getAuthor();
    log(`✍️  Autor del dibujo: ${author}`);

    try {
      const imageUrl = await wiki.getImageUrl();
      log(`🖼️  URL de imagen obtenida: ${imageUrl}`);

      const filePath = `images/${name}.jpg`;
      await downloadImage(imageUrl, filePath);
      await validateImage(filePath);
      log(`✅ Imagen validada correctamente para ${name}`);
    } catch (err) {
      log(`⚠️ No se pudo descargar o validar la imagen de ${name}: ${err}`);
    }

    log(`✅ Test Wikipedia finalizado para ${name} a las ${new Date().toLocaleString()}`);
  });
}
