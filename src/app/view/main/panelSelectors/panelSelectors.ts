import { appSettings } from '../../../../app';
import { clear } from '../../../abstract/functions';
import { getLangMapping } from '../../../abstract/mapping';
import {
  ArrayS,
  ArrOptions,
  IData,
  SettingsValue,
  RangeOptions,
} from '../../../abstract/types';
import Control from '../../../common/control';
import ControlButton from '../../controlButton/controlButton';
import ViewCheckSelector from '../../viewCheckSelector/viewCheckSelector';
import ViewFixedSelector from '../../viewFixedSelector/viewFixedSelector';
import ViewRangeSelector from '../../viewRangeSelector/viewRangeSelector';
import './panelSelectors.scss';

type TSelectors = Control | ViewFixedSelector | ViewRangeSelector | ViewCheckSelector;

export class ViewPanelSelectors {
  private _container: Control;

  //   controls
  private _controls: Map<string, TSelectors>;

  constructor(parent: Control) {
    this._container = new Control(parent.node, 'div', 'selectors-panel');

    this._controls = new Map([]);
  }

  public render() {
    clear(this._container);

    const selectors = appSettings.getSelectors();
    const model = appSettings.getModel();

    this.addFixed(selectors.fixed, model.fixed);
    this.addRange(selectors.range, model.range);
    this.addCheck(selectors.check, model.check);

    new Control(this._container.node, 'div', 'selectors-panel__separator');

    this._controls.set(
      'reset',
      new ControlButton(
        this._container,
        'button_primary button_reset',
        getLangMapping('reset')
      )
    );

    this._controls.set(
      'clear',
      new ControlButton(
        this._container,
        'button_primary button_clear',
        getLangMapping('clear')
      )
    );
  }

  private addFixed(fixed: ArrOptions, values: ArrOptions) {
    const arrFixed = Object.entries(fixed); // arr ot [key, value] = ['artCategory', enArtCategory]

    arrFixed.forEach((ctrl) => {
      const selector = new Control(
        this._container.node,
        'div',
        'selector selector_fixed'
      );

      const [key, allValues] = ctrl;

      this._controls.set(
        key,
        new ViewFixedSelector(selector, <keyof IData>key, allValues, values[key])
      );
    });
  }

  private addRange(range: RangeOptions, values: RangeOptions) {
    const arrRange = Object.entries(range); // arr ot [key, value] = ['price', { min: 0, max: 1000000 }]

    arrRange.forEach((ctrl) => {
      const selector = new Control(
        this._container.node,
        'div',
        'selector selector_range'
      );

      const [key, allValues] = ctrl;

      this._controls.set(
        key,
        new ViewRangeSelector(
          selector,
          <keyof IData>key,
          allValues,
          values[key] ? values[key] : allValues
        )
      );
    });
  }

  private addCheck(arrCheck: ArrayS, values: ArrayS) {
    arrCheck.forEach((key) => {
      const selector = new Control(
        this._container.node,
        'div',
        'selector selector_check'
      );

      this._controls.set(
        key,
        new ViewCheckSelector(selector, <keyof IData>key, values.includes(key))
      );
    });
  }

  public setClearHandler(callback: () => void) {
    const buttonClear = this._controls.get('clear');

    if (buttonClear instanceof Control) {
      buttonClear.node.addEventListener('click', callback);
    }
  }

  public setResetHandler(callback: () => void) {
    const buttonReset = this._controls.get('reset');

    if (buttonReset instanceof Control) {
      buttonReset.node.addEventListener('click', callback);
    }
  }

  public setPanelSelectorsHandler(callback: (modelValue: SettingsValue) => void) {
    this._controls.forEach((selector, name) => {
      if (!(selector instanceof Control)) selector.setHandler(name, callback);
    });
  }
}

export default ViewPanelSelectors;
