import { getLangMapping } from '../../abstract/mapping';
import { ArrayS, SettingsValue } from '../../abstract/types';
import Control from '../../common/control';
import './viewSelectSelector.scss';

export class ViewSelectSelector {
  private _select: Control<HTMLSelectElement>;

  constructor(parent: Control, key: string, allValues: ArrayS, values: ArrayS) {
    new Control(parent.node, 'div', 'selector__title', getLangMapping(key));

    this._select = new Control(parent.node, 'select', 'select');

    const fragment = document.createDocumentFragment();

    allValues.forEach((item) => {
      const option = document.createElement('option');
      option.textContent = getLangMapping(item);
      option.value = item;
      fragment.append(option);
    });

    this._select.node.append(fragment);

    this._select.node.value = values[0];
  }

  public setHandler(key: string, callback: (modelValue: SettingsValue) => void) {
    this._select.node.addEventListener('change', () => {
      callback({
        type: 'select',
        key: key,
        newValue: this._select.node.value,
      });
    });
  }
}

export default ViewSelectSelector;
