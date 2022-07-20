import { getLangMapping } from '../../abstract/mapping';
import { SettingsValue } from '../../abstract/types';
import Control from '../../common/control';
import ControlButton from '../controlButton/controlButton';
import './viewSearchSelector.scss';

export class ViewSearchSelector {
  private _input: Control<HTMLInputElement>;

  private _button: ControlButton;

  constructor(parent: Control, key: string) {
    new Control(parent.node, 'div', 'selector__title', getLangMapping(key));

    this._input = new Control(parent.node, 'input', 'search__input');
    this._input.node.placeholder = getLangMapping('placeholder');
    this._input.node.focus();

    this._button = new ControlButton(parent, 'button_x', 'X');
  }

  public setHandler(key: string, callback: (modelValue: SettingsValue) => void) {
    this._input.node.addEventListener('input', () => {
      callback({
        type: 'search',
        key: key,
        newValue: this._input.node.value,
      });
    });

    this._button.node.addEventListener('click', () => {
      this._input.node.value = '';

      callback({
        type: 'search',
        key: key,
        newValue: this._input.node.value,
      });
    });
  }
}

export default ViewSearchSelector;
