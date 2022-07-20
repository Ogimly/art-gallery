export type MapNS = Map<number, string>;
export type MapSS = Map<string, string>;

export type ArrayS = Array<string>;
export type ArrayN = Array<number>;

export type SetS = Set<string>;

export type ArrOptions = Record<string, ArrayS>;
export type SOptions = Record<string, string>;
export type NOptions = Record<string, number>;

export type TRange = {
  min: number;
  max: number;
};
export type RangeOptions = Record<string, TRange>;

export type SettingsValue = {
  type: string;
  key: string;
  newValue: ArrayS | TRange | boolean | string;
};

export type ControlsOptions = {
  fixed: ArrOptions;
  range: RangeOptions;
  check: ArrayS;
};

export type ModelOptions = {
  fixed: ArrOptions;
  range: RangeOptions;
  check: ArrayS;
};

export interface ISettings {
  selectors: ControlsOptions;
  model: ModelOptions;
  view: SOptions;
  favorite: ArrayN;
  bag: ArrayN;
}

export type TData = Array<IData>;
export interface IData {
  indexImage: number;
  indexAuthor: number;
  year: number;

  urlToImage: string;

  artCategory: string;
  paintingTechnique: string;
  period: string;
  sellCategory: string;

  price: number;
  stock: number;

  inStock: boolean;
  last: boolean;

  inBag: boolean;
  inFavorite: boolean;
}

export type TJson = Array<IJson>;
export type IJson = {
  index: string;
  author: string;
  year: string;
};
