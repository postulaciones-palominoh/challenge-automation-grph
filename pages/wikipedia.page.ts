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
    const img = this.page.locator('table.infobox a.image img');
    const src = await img.getAttribute('src');
    return `https:${src}`;
  }
}