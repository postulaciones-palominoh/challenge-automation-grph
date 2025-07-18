import { Page } from '@playwright/test';

export class WikipediaPage {
  constructor(private page: Page) {}

  async goto(pokemon: string) {
    await this.page.goto(`https://en.wikipedia.org/wiki/${pokemon}`);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getAuthor(): Promise<string> {
    const locator = this.page.locator('text=/artwork by/i');
    return (await locator.textContent()) || 'Desconocido';
  }

  async getImageUrl(): Promise<string> {
  const img = this.page.locator('.infobox img'); 

  try {
    await img.first().waitFor({ state: 'visible', timeout: 10_000 });
    const src = await img.first().getAttribute('src');
    if (!src) throw new Error('❌ No se encontró atributo src en la imagen');
    return src.startsWith('http') ? src : `https:${src}`;
  } catch (error) {
    throw new Error(`❌ No se encontró la imagen destacada del Pokémon: ${error}`);
  }
}
}