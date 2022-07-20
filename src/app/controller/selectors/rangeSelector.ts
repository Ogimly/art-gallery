import { IData, TRange, TData } from '../../abstract/types';
import Selector from './selector';

export class RangeSelector extends Selector<keyof IData, TRange, TRange> {
  public clearValues(): void {
    this._values.min = this._allValues.min;
    this._values.max = this._allValues.max;
  }

  filter(data: TData): TData {
    // TData = Array<IData>
    if (!this._values) return data;
    return data.filter(
      (el) => +el[this._key] >= this._values.min && +el[this._key] <= this._values.max
    );
  }
}

export default RangeSelector;
