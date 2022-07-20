import { appSettings } from '../../../../app';
import { currOptions, pageSizes, sortOptions } from '../../../abstract/const';
import { clear } from '../../../abstract/functions';
import { getLangMapping, langOptions } from '../../../abstract/mapping';
import { ArrayS, SettingsValue } from '../../../abstract/types';
import Control from '../../../common/control';
import ViewCheckSelector from '../../viewCheckSelector/viewCheckSelector';
import ViewSearchSelector from '../../viewSearchSelector/viewSearchSelector';
import ViewSelectSelector from '../../viewSelectSelector/viewSelectSelector';
import './panelHeader.scss';

type TSelectors = Control | ViewCheckSelector | ViewSearchSelector | ViewSelectSelector;

export class ViewPanelHeader {
  private _container: Control;

  //   controls
  private _controls: Map<string, TSelectors>;

  constructor(parent: Control) {
    this._container = new Control(
      new Control(parent.node, 'div', 'header__panel').node,
      'div',
      'panel-inner'
    );

    this._controls = new Map([]);
  }

  public render() {
    clear(this._container);

    const view = appSettings.getView();
    const { lang, sorting, byPage, currency } = view;

    let wrapper = new Control(this._container.node, 'div', 'selector-wrapper');
    const langSelector = new ViewSelectSelector(
      new Control(wrapper.node, 'div', 'selector selector_select selector_lang'),
      'lang',
      langOptions,
      [lang]
    );
    this._controls.set('lang', langSelector);

    const currencySelector = new ViewSelectSelector(
      new Control(wrapper.node, 'div', 'selector selector_select selector_currency'),
      'currency',
      currOptions,
      [currency]
    );
    this._controls.set('currency', currencySelector);
    // end wrapper

    const byPageSelector = new ViewSelectSelector(
      new Control(
        this._container.node,
        'div',
        'selector selector_select selector_page-size'
      ),
      'byPage',
      pageSizes,
      [byPage]
    );
    this._controls.set('byPage', byPageSelector);
    // no wrapper

    wrapper = new Control(this._container.node, 'div', 'selector-wrapper');
    const sortSelector = new ViewSelectSelector(
      new Control(wrapper.node, 'div', 'selector selector_select selector_sort'),
      'sorting',
      sortOptions,
      [sorting]
    );
    this._controls.set('sorting', sortSelector);

    const searchSelector = new ViewSearchSelector(
      new Control(wrapper.node, 'div', 'selector selector_search'),
      'search'
    );
    this._controls.set('search', searchSelector);
    // end wrapper

    wrapper = new Control(this._container.node, 'div', 'selector-wrapper');

    const favorite = new Control(
      wrapper.node,
      'div',
      'selector selector_check selector_favorite'
    );

    const favoriteCounter = new Control(
      favorite.node,
      'div',
      'favorite_counter',
      appSettings.getFavorite().length.toString()
    );
    this._controls.set('favorite_counter', favoriteCounter);

    const favoriteSelector = new ViewCheckSelector(favorite, 'inFavorite', false);
    this._controls.set('inFavorite', favoriteSelector);

    const bag = new Control(wrapper.node, 'div', 'selector selector_check selector_bag');

    const bagCounter = new Control(
      bag.node,
      'div',
      'bag_counter',
      appSettings.getBag().length.toString()
    );
    this._controls.set('bag_counter', bagCounter);

    const bagSelector = new ViewCheckSelector(bag, 'inBag', false);
    this._controls.set('inBag', bagSelector);
    // end wrapper
  }

  newSelectSelector(
    parent: Control,
    key: string,
    arrSelect: ArrayS,
    values: ArrayS
  ): Control {
    new Control(parent.node, 'div', 'selector__title', getLangMapping(key));

    const res = new Control<HTMLSelectElement>(parent.node, 'select', 'select');

    const fragment = document.createDocumentFragment();
    arrSelect.forEach((item) => {
      const option = document.createElement('option');
      option.textContent = getLangMapping(item);
      option.value = item;
      fragment.append(option);
    });
    res.node.append(fragment);

    res.node.value = values[0];

    return res;
  }

  public setPanelHeaderHandler(callback: (viewValue: SettingsValue) => void) {
    this._controls.forEach((selector, name) => {
      if (!(selector instanceof Control)) selector.setHandler(name, callback);
    });
  }

  public setBagCounter(i: number) {
    const counter = <Control>this._controls.get('bag_counter');
    if (counter) counter.node.textContent = i.toString();
  }

  public setFavoriteCounter(i: number) {
    const counter = <Control>this._controls.get('favorite_counter');
    if (counter) counter.node.textContent = i.toString();
  }
}

export default ViewPanelHeader;
