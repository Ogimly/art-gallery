import { appSettings } from '../../../app';
import { getLangMapping } from '../../abstract/mapping';
import { ArrayS, SettingsValue } from '../../abstract/types';
import Control from '../../common/control';
import './viewFixedSelector.scss'

export class ViewFixedSelector {
  private _parent: Control;

  private _mapValues: Map<string, Control>;

  constructor(parent: Control, key: string, allValues: ArrayS, values: ArrayS) {
    new Control(parent.node, 'div', 'selector__title', getLangMapping(key));

    this._parent = parent;

    this._mapValues = this.addFixedOptions(parent, allValues, values);
  }

  private addFixedOptions(
    parent: Control,
    allValues: ArrayS,
    values: ArrayS
  ): Map<string, Control> {
    const res = new Map<string, Control>;

    allValues.forEach((value) => {
      const has = values && values.includes(value);

      res.set(
        value,
        new Control(
          parent.node,
          'div',
          `selector__item${has ? ' active' : ''}`, 
          getLangMapping(value)
        )
      );
    });

    return res;
  }

  public setHandler(key: string, callback: (modelValue: SettingsValue) => void) {
    this._parent.node.addEventListener('click', (e) => {
      const values = appSettings.getModelFixed(key);

      const target = e.target;
      if (target && target instanceof Element) {
        target.classList.toggle('active');

        const set = new Set(values);

        // ['portrait', Control for portrait]
        this._mapValues.forEach((ctrl, value) => {
          if (ctrl.node === target) 
            if (set.has(value)) {
              set.delete(value)
            } else {
              set.add(value)
            }
        });

        callback({
          type: 'fixed',
          key: key,
          newValue: [...set]
        });
      } 
    });

  }

}

export default ViewFixedSelector;
