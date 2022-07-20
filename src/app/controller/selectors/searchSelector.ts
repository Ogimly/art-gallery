import { getLangAuthor, getLangName } from '../../abstract/mapping';
import { TData } from '../../abstract/types';
import Selector from './selector';

export class SearchSelector extends Selector<string, string, string> {
  constructor(key: string) {
    super(key, '', '');
  }

  public clearValues(): void {
    this._values = '';
  }

  filter(data: TData): TData {
    // TData = Array<IData>

    const str = (this._values || '').toUpperCase();

    if (!str) return data;
    return data.filter(
      (el) =>
        getLangName(el.indexImage).toUpperCase().includes(str) ||
        getLangAuthor(el.indexAuthor).toUpperCase().includes(str)
    );
  }
}

export default SearchSelector;
