import * as xlsx from 'xlsx';

export function readPokemonData(path: string): string[] {
  const wb = xlsx.readFile(path);
  const sheet = wb.Sheets['GET pokemon'];
  const rows = xlsx.utils.sheet_to_json<any[]>(sheet, { header: 1 }).slice(1);
  const ids = rows.map(r => r[0]).filter(Boolean);
  const names = rows.map(r => r[1]).filter(Boolean);
  return [...new Set([...ids, ...names].map(String))];
}

export function readPokemonNames(path: string): string[] {
  const wb = xlsx.readFile(path);
  const sheet = wb.Sheets['GET pokemon'];
  const rows = xlsx.utils.sheet_to_json<any[]>(sheet, { header: 1 }).slice(1);
  return [...new Set(rows.map(r => r[1]).filter(Boolean).map(String))];
}