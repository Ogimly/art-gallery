import { toggleItem, addItem, removeItem } from './functions';

//* ------ toggleItem ------
describe('toggleItem', () => {
  it('Should be a function', () => {
    expect(toggleItem).toBeInstanceOf(Function);
  });

  it('Should be add item', () => {
    const data = [1, 2, 3];

    const res = toggleItem(data, 4);

    expect(res).toEqual([1, 2, 3, 4]);
  });

  it('Should be remove item', () => {
    const data = [1, 2, 3];

    const res = toggleItem(data, 3);

    expect(res).toEqual([1, 2]);
  });
});

//* ------ addItem ------
describe('addItem', () => {
  it('Should be a function', () => {
    expect(addItem).toBeInstanceOf(Function);
  });

  it('Should be add item', () => {
    const data = [1, 2, 3];

    const res = addItem(data, 4);

    expect(res).toEqual([1, 2, 3, 4]);
  });

  it('Should be add only unique item', () => {
    const data = [1, 2, 3];

    const res = addItem(data, 3);

    expect(res).toEqual([1, 2, 3]);
  });
});

//* ------ removeItem ------
describe('removeItem', () => {
  it('Should be a function', () => {
    expect(removeItem).toBeInstanceOf(Function);
  });

  it('Should be remove item from array', () => {
    const data = [1, 2, 3];

    const res = removeItem(data, 3);

    expect(res).toEqual([1, 2]);
  });

  it('Should be ignore item, if it not in array', () => {
    const data = [1, 2, 3];

    const res = removeItem(data, 4);

    expect(res).toEqual([1, 2, 3]);
  });
});
