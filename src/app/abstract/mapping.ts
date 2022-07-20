import { ArrayS, MapSS } from './types';
import enObj from '../model/data/langs/en.json';
import ruObj from '../model/data/langs/ru.json';
import enImages from '../model/data/langs/en-images.json';
import ruImages from '../model/data/langs/ru-images.json';
import enAuthors from '../model/data/langs/en-authors.json';
import ruAuthors from '../model/data/langs/ru-authors.json';
import { appSettings } from '../../app';

const en = new Map<string, string>(Object.entries(enObj));
const ru = new Map<string, string>(Object.entries(ruObj));

const mapping: ReadonlyMap<string, MapSS> = new Map<string, MapSS>([
  ['en', en],
  ['ru', ru],
]);

export const langOptions: ArrayS = [...mapping.keys()];

export function getMapping(lang: string, key: unknown): string {
  if (typeof key === 'string') return mapping.get(lang)?.get(key) || '';
  return '';
}

export function getLangMapping(key: unknown): string {
  const lang = appSettings.getView().lang;
  if (typeof key === 'string') return mapping.get(lang)?.get(key) || '';
  return '';
}

const enI = new Map<string, string>(Object.entries(enImages));
const ruI = new Map<string, string>(Object.entries(ruImages));
const enA = new Map<string, string>(Object.entries(enAuthors));
const ruA = new Map<string, string>(Object.entries(ruAuthors));

const mappingI: ReadonlyMap<string, MapSS> = new Map<string, MapSS>([
  ['en', enI],
  ['ru', ruI],
]);

const mappingA: ReadonlyMap<string, MapSS> = new Map<string, MapSS>([
  ['en', enA],
  ['ru', ruA],
]);

export function getAuthor(lang: string, i: unknown): string {
  const key = `${i}`;
  if (typeof key === 'string') return mappingA.get(lang)?.get(key) || key;
  return '';
}

export function getLangAuthor(i: unknown): string {
  const lang = appSettings.getView().lang;
  const key = `${i}`;
  if (typeof key === 'string') return mappingA.get(lang)?.get(key) || key;
  return '';
}

export function getName(lang: string, i: unknown): string {
  const key = `${i}`;
  if (typeof key === 'string') return mappingI.get(lang)?.get(key) || key;
  return '';
}

export function getLangName(i: unknown): string {
  const lang = appSettings.getView().lang;
  const key = `${i}`;
  if (typeof key === 'string') return mappingI.get(lang)?.get(key) || key;
  return '';
}
