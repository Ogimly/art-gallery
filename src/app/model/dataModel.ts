import { TData, IJson, ArrayN, TJson } from '../abstract/types';
import dataArt from './data/data.json';
import { artCategory, sizeArtCategory, period } from '../abstract/const';
import { paintingTechnique, sizePaintingTechnique } from '../abstract/const';
import { sellCategory, sizeSellCategory } from '../abstract/const';

class DataModel {
  private _data: TData;

  constructor(from: TJson = dataArt) {
    this._data = DataModel.LoadData(from);
  }

  public getData() {
    return [...this._data];
  }

  public setInBag(bag: ArrayN) {
    if (bag) this._data.forEach((item, i) => (item.inBag = bag.includes(i)));
  }

  public setOneInBag(i: number) {
    if (i < this._data.length) this._data[i].inBag = !this._data[i].inBag;
  }

  public setInFavorite(favorite: ArrayN) {
    if (favorite)
      this._data.forEach((item, i) => (item.inFavorite = favorite.includes(i)));
  }

  public setOneInFavorite(i: number) {
    if (i < this._data.length) this._data[i].inFavorite = !this._data[i].inFavorite;
  }

  private static LoadData(data: TJson): TData {
    const getUrlToImage = (item: IJson) => {
      return `./cut/${item.index}.jpg`;
    };

    const getArtCategory = () => {
      return artCategory[Math.floor(Math.random() * sizeArtCategory)];
    };

    const getPaintingTechnique = () => {
      return paintingTechnique[Math.floor(Math.random() * sizePaintingTechnique)];
    };

    const getPeriod = (item: IJson) => {
      const year = +item.year;
      if (year < 1500) return period[0];
      if (year < 1750) return period[1];
      if (year < 1840) return period[2];
      if (year < 1880) return period[3];
      if (year < 1910) return period[4];
      return period[5];
    };

    const getSellCategory = () => {
      const i = Math.floor(Math.random() * sizeSellCategory * 1.5);
      return sellCategory[i > sizeSellCategory - 1 ? 0 : i];
    };

    const getStock = () => {
      return Math.floor(Math.random() * 11);
    };

    const getPrice = () => {
      return Math.floor(Math.random() * 16) * 5 + 20;
    };

    return data.map((el) => {
      const loaded = {
        indexImage: +el.index,
        indexAuthor: +el.author,
        year: +el.year,

        urlToImage: getUrlToImage(el),

        artCategory: getArtCategory(),
        paintingTechnique: getPaintingTechnique(),
        period: getPeriod(el),
        sellCategory: getSellCategory(),

        price: getPrice(),
        stock: getStock(),

        inStock: false,
        last: false,

        inFavorite: false,
        inBag: false,
      };

      loaded.inStock = !(loaded.stock === 0);
      loaded.last = loaded.stock === 1;

      return loaded;
    });
  }
}

export default DataModel;
