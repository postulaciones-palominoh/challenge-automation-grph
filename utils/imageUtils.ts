import fs from 'fs';
import https from 'https';
import path from 'path';

/**
 * Descarga una imagen desde una URL y la guarda en el disco.
 */
export async function downloadImage(url: string, filepath: string): Promise<void> {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const file = fs.createWriteStream(filepath);

  await new Promise<void>((resolve, reject) => {
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }).on('error', (err) => {
      fs.unlinkSync(filepath);
      reject(err);
    });
  });
}

/**
 * Valida extensión y tamaño de una imagen descargada.
 */
export async function validateImage(filepath: string): Promise<void> {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
  const ext = path.extname(filepath).toLowerCase();
  const size = fs.statSync(filepath).size;

  if (!validExtensions.includes(ext)) {
    throw new Error(`❌ Extensión inválida: ${ext}`);
  }
  if (size > 500_000) {
    throw new Error(`❌ Tamaño excedido: ${size} bytes`);
  }
}
