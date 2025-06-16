import fs from 'fs';
import https from 'https';
import path from 'path';
import { log, logError } from './loggers';

export async function downloadImage(url: string, filepath: string): Promise<void> {
  const dir = path.dirname(filepath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const file = fs.createWriteStream(filepath);

  await new Promise<void>((resolve, reject) => {
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close((err) => {
          if (err) {
            logError(`❌ Error al cerrar el archivo ${filepath}: ${err}`);
            reject(err);
          } else {
            log(`✅ Imagen descargada correctamente: ${filepath}`);
            resolve();
          }
        });
      });
    }).on('error', (err) => {
      logError(`❌ Error al descargar imagen desde ${url}: ${err}`);
      try {
        fs.unlinkSync(filepath);
      } catch (unlinkErr) {
        logError(`❌ Error al eliminar archivo incompleto: ${filepath}`);
      }
      reject(err);
    });
  });
}

export async function validateImage(filepath: string): Promise<void> {
  try {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.svg'];
    const ext = path.extname(filepath).toLowerCase();
    const size = fs.statSync(filepath).size;

    if (!validExtensions.includes(ext)) {
      throw new Error(`❌ Extensión inválida: ${ext}`);
    }
    if (size > 500_000) {
      throw new Error(`❌ Tamaño excedido: ${size} bytes`);
    }

    log(`✅ Imagen validada correctamente: ${filepath}`);
  } catch (err) {
    logError(`❌ Error al validar imagen ${filepath}: ${err}`);
    throw err;
  }
}
