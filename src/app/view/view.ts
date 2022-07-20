import { SettingsValue, TData } from '../abstract/types';
import ViewFooter from './footer/footer';
import ViewHeader from './header/header';
import ViewMain from './main/main';
import './view.scss';

export class ViewApp {
  // view components
  private _header: ViewHeader;

  private _main: ViewMain;

  private _footer: ViewFooter;

  constructor() {
    this._header = new ViewHeader();
    this._main = new ViewMain();
    this._footer = new ViewFooter();
  }

  public render(data: TData) {
    this._header.render();
    this._main.render(data);
    this._footer.render();
  }

  public renderShowCase(data: TData) {
    this._main.renderShowcase(data);
  }

  public renderPanelSelectors() {
    this._main.renderPanelSelectors();
  }

  public setClearHandler(callback: () => void) {
    this._main.setClearHandler(callback);
  }

  public setResetHandler(callback: () => void) {
    this._main.setResetHandler(callback);
  }

  public setPanelSelectorsHandler(callback: (modelValue: SettingsValue) => void) {
    this._main.setPanelSelectorsHandler(callback);
  }

  public setPanelHeaderHandler(callback: (viewValue: SettingsValue) => void) {
    this._header.setPanelHeaderHandler(callback);
  }

  public setShowcaseHandler(
    callbackBag: (i: number) => boolean,
    callbackFavorite: (i: number) => boolean
  ) {
    this._main.setShowcaseHandler(callbackBag, callbackFavorite);
  }

  public setBagCounter(i: number) {
    this._header.setBagCounter(i);
  }

  public setFavoriteCounter(i: number) {
    this._header.setFavoriteCounter(i);
  }
}

export default ViewApp;
