import { appSettings } from '../../../../app';
import { clear } from '../../../abstract/functions';
import { getLangMapping } from '../../../abstract/mapping';
import { TData } from '../../../abstract/types';
import Control from '../../../common/control';
import ControlButton from '../../controlButton/controlButton';
import ViewSKU from '../viewSKU/viewSKU';
import './viewShowcase.scss';

export class ViewShowcase {
  private _container: Control;

  private _title: Control;

  private _showcase: Control;

  private _pageLoader: ControlButton;

  // pages options
  private _options: Record<string, number>; // currentPage [0 .. currentPage * byPage]

  // DOM arr
  private _arrSKU: Array<ViewSKU>;

  // callbacks for render
  private _callbacks: Array<(i: number) => boolean>;

  constructor(parent: Control) {
    this._container = new Control(parent.node, 'div', 'showcase-wrapper');
    this._title = new Control(this._container.node, 'div', 'showcase__title');
    this._showcase = new Control(this._container.node, 'div', 'showcase');
    this._pageLoader = new ControlButton(this._container, 'button_next', '');
    this._pageLoader.node.addEventListener('click', () => {
      this.renderPage();
    });

    // view
    this._options = { byPage: 0, currentPage: 0, pages: 0 };

    // DOM arr
    this._arrSKU = [];

    // callbacks for render
    this._callbacks = [];
  }

  public render(data: TData) {
    clear(this._showcase);
    this._pageLoader.removeClassName('hidden');

    this._arrSKU = this.createArray(data);

    const byPage = +appSettings.getView().byPage;
    const pages = Math.ceil(this._arrSKU.length / byPage);
    this._options = { byPage: byPage, currentPage: 0, pages: pages };

    this.renderTitle(this._arrSKU.length);
    this.renderPage();
  }

  private createArray(data: TData) {
    return data.map((sku) => new ViewSKU(sku));
  }

  private renderTitle(n: number) {
    this._title.node.textContent =
      n === 0 ? getLangMapping('nothing') : `${getLangMapping('find')}: ${n}`;
  }

  private renderPage() {
    const { byPage, currentPage, pages } = this._options;

    const first = currentPage * byPage;
    const len = Math.min(first + byPage, this._arrSKU.length);

    const callbackBag = this._callbacks[0];
    const callbackFavorite = this._callbacks[1];

    for (let i = first; i < len; i++) {
      const sku = this._arrSKU[i];
      sku.render(this._showcase);

      sku.setShowcaseHandler(callbackBag, callbackFavorite);
    }

    this._pageLoader.setContent(
      `${getLangMapping('showNext')} ${
        Math.min((currentPage + 2) * byPage, this._arrSKU.length) -
        (currentPage + 1) * byPage
      }`
    );

    this._options.currentPage += 1;

    if (this._options.currentPage >= pages) this._pageLoader.addClassName('hidden');
  }

  public setShowcaseHandler(
    callbackBag: (i: number) => boolean,
    callbackFavorite: (i: number) => boolean
  ) {
    this._callbacks.push(callbackBag);
    this._callbacks.push(callbackFavorite);
  }
}

export default ViewShowcase;
