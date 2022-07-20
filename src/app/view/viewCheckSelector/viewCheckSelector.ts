import { getLangMapping } from '../../abstract/mapping';
import { SettingsValue } from '../../abstract/types';
import Control from '../../common/control';
import './viewCheckSelector.scss';

export class ViewCheckSelector {
  private _selector: Control<HTMLInputElement>;

  constructor(parent: Control, key: string, value: boolean) {
    new Control(parent.node, 'div', 'selector__title', getLangMapping(key));

    this._selector = new Control(parent.node, 'input', 'selector__check');
    this._selector.node.type = 'checkbox';
    this._selector.node.checked = value;
    this._selector.node.id = key;

    new Control<HTMLLabelElement>(
      parent.node,
      'label',
      'selector__label',
      getLangMapping(key)
    ).node.htmlFor = key;
  }

  public setHandler(key: string, callback: (modelValue: SettingsValue) => void) {
    this._selector.node.addEventListener('change', () => {
      callback({
        type: 'check',
        key: key,
        newValue: this._selector.node.checked,
      });
    });
  }
}

export default ViewCheckSelector;
