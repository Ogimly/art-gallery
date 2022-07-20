import { IData, ArrayS, TData } from '../../abstract/types';
import Selector from './selector';

export class FixedSelector extends Selector<keyof IData, ArrayS, ArrayS> {
  public clearValues(): void {
    this._values = <ArrayS>[];
  }

  public filter(data: TData): TData {
    // TData = Array<IData>
    if (!this._values || this._values.length === 0) return data;
    return data.filter((el) => this._values.includes(`${el[this._key]}`));
  }
}

export default FixedSelector;
