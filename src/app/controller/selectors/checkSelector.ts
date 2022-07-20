import Selector from './selector';
import { IData, TData } from '../../abstract/types';

export class CheckSelector extends Selector<keyof IData, boolean, boolean> {
  constructor(key: keyof IData, value: boolean) {
    super(key, true, value);
  }

  public clearValues(): void {
    this._values = false;
  }

  public filter(data: TData): TData {
    // TData = Array<IData>
    if (!this._values) return data;
    return data.filter((el) => el[this._key]);
  }
}

export default CheckSelector;
