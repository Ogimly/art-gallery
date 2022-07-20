import { TData } from '../../abstract/types';

export abstract class Selector<K, A, V> {
  protected _key: K;

  protected _allValues: A;

  protected _values: V;

  constructor(key: K, allValues: A, values: V) {
    this._key = key;

    this._allValues = allValues;
    this._values = values;
  }

  public getKey() {
    return this._key;
  }

  public getValues() {
    return this._values;
  }

  public setValues(newValues: V) {
    this._values = newValues;
  }

  abstract filter(data: TData): TData;

  abstract clearValues(): void;
}

export default Selector;
