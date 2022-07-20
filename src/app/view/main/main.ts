import Control from '../../common/control';
import ViewPanelSelectors from './panelSelectors/panelSelectors';
import './main.scss';
import ViewShowcase from './viewShowcase/viewShowcase';
import { SettingsValue, TData } from '../../abstract/types';

export class ViewMain extends Control {
  private _panelSelectors: ViewPanelSelectors;

  private _showcase: ViewShowcase;

  constructor() {
    super(document.body, 'main', 'main');

    this._panelSelectors = new ViewPanelSelectors(this);
    this._showcase = new ViewShowcase(this);
  }

  public render(data: TData) {
    this._panelSelectors.render();
    this._showcase.render(data);
  }

  public renderPanelSelectors() {
    this._panelSelectors.render();
  }

  public renderShowcase(data: TData) {
    this._showcase.render(data);
  }

  public setClearHandler(callback: () => void) {
    this._panelSelectors.setClearHandler(callback);
  }

  public setResetHandler(callback: () => void) {
    this._panelSelectors.setResetHandler(callback);
  }

  public setPanelSelectorsHandler(callback: (modelValue: SettingsValue) => void) {
    this._panelSelectors.setPanelSelectorsHandler(callback);
  }

  public setShowcaseHandler(
    callbackBag: (i: number) => boolean,
    callbackFavorite: (i: number) => boolean
  ) {
    this._showcase.setShowcaseHandler(callbackBag, callbackFavorite);
  }
}

export default ViewMain;
