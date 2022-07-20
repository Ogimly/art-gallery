import { appSettings } from '../../../../app';
import { mapCurrency } from '../../../abstract/const';
import { getLangAuthor, getLangMapping, getLangName } from '../../../abstract/mapping';
import { IData } from '../../../abstract/types';
import Control from '../../../common/control';
import ControlButton from '../../controlButton/controlButton';
import './viewSKU.scss';

export class ViewSKU {
  // data model
  private _data: IData;

  // view DOM
  private _wrapper: Control;

  private _bagButton: ControlButton;

  private _favoriteButton: ControlButton;

  constructor(item: IData) {
    this._data = item;

    this._wrapper = <Control>{};
    this._bagButton = <ControlButton>{};
    this._favoriteButton = <ControlButton>{};
  }

  public render(parent: Control) {
    const sku = this._data;
    const wrapper = new Control(parent.node, 'div', 'sku');

    const image = new Control(wrapper.node, 'div', 'sku__image');
    const img = new Image();
    img.src = sku.urlToImage;
    img.alt = getLangName(sku.indexImage);
    img.classList.add('sku__img');
    image.node.appendChild(img);

    new Control(wrapper.node, 'div', 'sku__title', getLangName(sku.indexImage));
    new Control(
      wrapper.node,
      'div',
      'sku__author',
      `${getLangAuthor(sku.indexAuthor)}, ${sku.year}`
    );

    new Control(wrapper.node, 'div', `sku__sell-category ${sku.sellCategory}`, '');

    this._favoriteButton = new ControlButton(
      wrapper,
      `button_favorite${this._data.inFavorite ? ' button_active' : ''}`,
      ''
    );

    const info = new Control(image.node, 'div', 'sku__info');

    new Control(info.node, 'div', 'sku__artCategory', getLangMapping(sku.artCategory));
    new Control(
      info.node,
      'div',
      'sku__paintingTechnique',
      getLangMapping(sku.paintingTechnique)
    );
    new Control(info.node, 'div', 'sku__period', getLangMapping(sku.period));
    new Control(info.node, 'div', 'sku__stock', ViewSKU.getStockDescription(sku.stock));

    this._bagButton = new ControlButton(
      wrapper,
      `button_bag${this._data.inBag ? ' button_active' : ''}`,
      ViewSKU.getPriceDescription(sku.price)
    );

    this._wrapper = wrapper;
  }

  private static getStockDescription(stock: number): string {
    if (stock === 0) return getLangMapping('oos');
    if (stock === 1) return getLangMapping('last');
    return `${getLangMapping('stock')} ${stock}`;
  }

  private static getPriceDescription(price: number): string {
    const currency = appSettings.getView().currency;
    return `${(mapCurrency.get(currency) || 1) * price}${getLangMapping(
      'currency' + currency
    )}`;
  }

  public setShowcaseHandler(
    callbackBag: (i: number) => boolean,
    callbackFavorite: (i: number) => boolean
  ) {
    this._bagButton.node.addEventListener('click', () => {
      if (callbackBag(this._data.indexImage)) {
        this._bagButton.node.classList.toggle('button_active');
      }
    });

    this._favoriteButton.node.addEventListener('click', () => {
      if (callbackFavorite(this._data.indexImage)) {
        this._favoriteButton.node.classList.toggle('button_active');
      }
    });
  }
}

export default ViewSKU;
