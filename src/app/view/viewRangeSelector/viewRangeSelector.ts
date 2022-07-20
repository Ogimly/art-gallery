import { getLangMapping } from '../../abstract/mapping';
import { SettingsValue, TRange } from '../../abstract/types';
import Control from '../../common/control';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './viewRangeSelector.scss';
import { appSettings } from '../../../app';

export class ViewRangeSelector {
  private _slider: noUiSlider.target;

  constructor(parent: Control, key: string, allValues: TRange, values: TRange) {
    new Control(parent.node, 'div', 'selector__title', getLangMapping(key));

    this._slider = new Control(parent.node, 'div', 'noUiSlider').node;
    noUiSlider.create(this._slider, {
      start: [values.min, values.max],
      tooltips: true,
      step: Math.floor((allValues.max - allValues.min) / 20),
      format: {
        to: function (value) {
          return value;
        },
        from: function (value) {
          return Number(value);
        },
      },
      connect: true,
      range: {
        min: allValues.min,
        max: allValues.max,
      },
    });
  }

  public setHandler(key: string, callback: (modelValue: SettingsValue) => void) {
    if (this._slider.noUiSlider)
      this._slider.noUiSlider.on('update', (val, handle) => {
        const newValue = appSettings.getModelRange(key);

        const value = +val[handle];
        if (handle === 0)
          if (newValue.min !== value) {
            newValue.min = value;

            callback({
              type: 'range',
              key: key,
              newValue: newValue,
            });
          }
        if (handle === 1)
          if (newValue.max !== value) {
            newValue.max = value;

            callback({
              type: 'range',
              key: key,
              newValue: newValue,
            });
          }
      });
  }
}

export default ViewRangeSelector;
