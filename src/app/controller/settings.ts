import {
  idApp,
  artCategory,
  paintingTechnique,
  period,
  sellCategory,
} from '../abstract/const';
import { addItem, removeItem } from '../abstract/functions';
import { ControlsOptions, ModelOptions, SOptions } from '../abstract/types';
import { SettingsValue, ArrayS, ArrayN, TRange } from '../abstract/types';

export class Settings {
  // selectors description
  private _selectors: ControlsOptions;

  // filters for model
  private _model: ModelOptions;

  // settings for views
  private _view: SOptions;

  // lists
  private _favorite: ArrayN;

  private _bag: ArrayN;

  constructor() {
    // selectors description
    this._selectors = {
      fixed: {
        artCategory: artCategory,
        paintingTechnique: paintingTechnique,
        period: period,
        sellCategory: sellCategory,
      },
      range: {
        price: { min: 0, max: 100 },
        year: { min: 1400, max: 2000 },
      },
      check: ['inStock', 'last'],
    };
    // filters for model
    this._model = this.getDefaultModel();
    // settings for views
    this._view = this.getDefaultView();
    // lists
    this._favorite = [];
    this._bag = [];

    this.loadSettings();
  }

  private getDefaultModel() {
    return {
      fixed: {
        artCategory: [],
        paintingTechnique: [],
        period: [],
        sellCategory: [],
      },
      range: {
        price: { min: 0, max: 100 },
        year: { min: 1400, max: 2000 },
      },
      check: [],
    };
  }

  private getDefaultView() {
    return { lang: 'en', currency: 'USD', byPage: '20', sorting: '+year' };
  }

  public getSelectors() {
    return { ...this._selectors };
  }

  public getModel() {
    return { ...this._model };
  }

  public setModel({ type, key, newValue }: SettingsValue) {
    if (type === 'fixed') this.setModelFixed(key, <ArrayS>newValue);
    if (type === 'range') this.setModelRange(key, <TRange>newValue);
    if (type === 'check') this.setModelCheck(key, <boolean>newValue);
  }

  public getModelFixed(key: string) {
    return this._model.fixed[key] ? this._model.fixed[key] : <ArrayS>[];
  }

  private setModelFixed(key: string, newValue: ArrayS) {
    this._model.fixed[key] = newValue;
    this.saveSettings();
  }

  public getModelRange(key: string) {
    return this._model.range[key] ? this._model.range[key] : <TRange>{};
  }

  private setModelRange(key: string, newValue: TRange) {
    this._model.range[key] = newValue;
    this.saveSettings();
  }

  public getModelCheck(key: string) {
    return this._model.check.includes(key);
  }

  private setModelCheck(key: string, newValue: boolean) {
    if (newValue) {
      this._model.check = addItem<string>(this._model.check, key);
    } else {
      this._model.check = removeItem<string>(this._model.check, key);
    }
    this.saveSettings();
  }

  public getView() {
    return { ...this._view };
  }

  public getViewSelect(key: string) {
    return this._view[key];
  }

  public setView({ type, key, newValue }: SettingsValue) {
    if (type === 'select') this.setViewSelect(key, <string>newValue);
  }

  private setViewSelect(key: string, newValue: string) {
    this._view[key] = newValue;
    this.saveSettings();
  }

  public getFavorite() {
    return [...this._favorite];
  }

  public setFavorite(newArr: ArrayN) {
    this._favorite = newArr;
    this.saveSettings();
  }

  public getBag() {
    return [...this._bag];
  }

  public setBag(newArr: ArrayN) {
    this._bag = newArr;
    this.saveSettings();
  }

  public clearSettings() {
    this._model = this.getDefaultModel();
    this._view = this.getDefaultView();
    this._favorite = [];
    this._bag = [];
    this.saveSettings();
  }

  public clearModel() {
    this._model = this.getDefaultModel();
    this.saveSettings();
  }

  private loadSettings() {
    const str = localStorage.getItem(idApp);

    if (str) {
      try {
        const settings = JSON.parse(str);

        if (settings !== null && typeof settings === 'object') {
          this._model = settings.model;
          this._view = settings.view;
          this._favorite = settings.favorite;
          this._bag = settings.bag;
        }
      } catch {
        // do nothing
      }
    }
  }

  public saveSettings() {
    localStorage.setItem(
      idApp,
      JSON.stringify({
        model: this._model,
        view: this._view,
        favorite: this._favorite,
        bag: this._bag,
      })
    );
  }
}

export default Settings;
