import { getLangMapping } from '../../abstract/mapping';
import { SettingsValue } from '../../abstract/types';
import Control from '../../common/control';
import './header.scss';
import ViewPanelHeader from './panelHeader/panelHeader';

export class ViewHeader extends Control {
  private _title: Control;

  private _panelHeader: ViewPanelHeader;

  constructor() {
    super(document.body, 'header', 'header');

    this._title = new Control(
      this.node,
      'p',
      'header__description',
      getLangMapping('header')
    );
    new Control(this.node, 'h1', 'header__title', 'Art Gallery');

    this._panelHeader = new ViewPanelHeader(this);
  }

  public render() {
    this._title.node.textContent = getLangMapping('header');

    this._panelHeader.render();
  }

  public setPanelHeaderHandler(callback: (viewValue: SettingsValue) => void) {
    this._panelHeader.setPanelHeaderHandler(callback);
  }

  public setBagCounter(i: number) {
    this._panelHeader.setBagCounter(i);
  }

  public setFavoriteCounter(i: number) {
    this._panelHeader.setFavoriteCounter(i);
  }
}

export default ViewHeader;
