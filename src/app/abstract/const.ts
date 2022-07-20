import { ArrayS } from './types';

export const artCategory = [
  'portrait',
  'landscape',
  'stillLife',
  'historical',
  'genreArt',
  'militaryArt',
  'animalism',
];
export const sizeArtCategory = artCategory.length;

export const paintingTechnique = ['acrylic', 'aquarelle', 'gouache', 'graphics', 'oil'];
export const sizePaintingTechnique = paintingTechnique.length;

export const period = [
  'renaissance',
  'baroque',
  'classicism',
  'romanticism',
  'impressionism',
  'avantgarde',
];
export const sizeArtPeriod = period.length;

export const sellCategory = ['normal', 'top', 'new', 'discount'];
export const sizeSellCategory = sellCategory.length;

export const sortOptions = [
  '+name',
  '-name',
  '+author',
  '-author',
  '+year',
  '-year',
  '+price',
  '-price',
];
export const sizeSortOptions = sortOptions.length;

export const pageSizes = ['20', '40', '60', '80', '100'];
export const sizePageSizes = pageSizes.length;

export const mapCurrency: ReadonlyMap<string, number> = new Map<string, number>([
  ['USD', 1],
  ['RUB', 80],
]);

export const currOptions: ArrayS = [...mapCurrency.keys()];

export const bagMaxSize = 20;

export const idApp = 'savedArtStoreSettings';
