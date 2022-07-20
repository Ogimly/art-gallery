import { getLangName, getLangAuthor } from '../../abstract/mapping';
import { ArrayS, IData, TData } from '../../abstract/types';
import Selector from './selector';

export class SelectSelector extends Selector<string, ArrayS, string> {
  public clearValues(): void {
    this._values = this._allValues[0];
  }

  filter(data: TData): TData {
    // TData = Array<IData>
    const sort = this._values;

    if (sort)
      return this.sortBy(data, <keyof IData>sort.slice(1), sort[0] === '+' ? 1 : -1);

    return data;
  }

  private sortBy(data: TData, name: keyof IData, direction: number): TData {
    return data.sort((a, b) => {
      let aName = a[name];
      let bName = b[name];
      if (`${name}` === 'name') {
        aName = getLangName(a.indexImage);
        bName = getLangName(b.indexImage);
      }
      if (`${name}` === 'author') {
        aName = getLangAuthor(a.indexAuthor);
        bName = getLangAuthor(b.indexAuthor);
      }

      if (typeof aName === 'number' && typeof bName === 'number') {
        if (aName === bName) return (a.indexImage - b.indexImage) * direction;
        return (aName - bName) * direction;
      }
      if (typeof aName === 'string' && typeof bName === 'string') {
        if (aName > bName) return 1 * direction;
        return -1 * direction;
      }

      return (a.indexImage - b.indexImage) * direction;
    });
  }
}

export default SelectSelector;
