import Selector from './selector';

const context = {
  _key: 'key',
  _allValues: ['key1', 'key2', 'key3'],
  _values: ['key2'],
};

//* ------ Selector.prototype.constructor ------
describe('Selector.prototype.constructor', () => {
  it('Should be a function', () => {
    expect(Selector.prototype.constructor).toBeInstanceOf(Function);
  });
});

//* ------ Selector.prototype.getKey ------
describe('Selector.prototype.getKey', () => {
  it('Should be a function', () => {
    expect(Selector.prototype.getKey).toBeInstanceOf(Function);
  });

  it('Should be return a key', () => {
    const res = Selector.prototype.getKey.call(context);

    expect(res).toEqual('key');
  });
});

//* ------ Selector.prototype.getValues ------
describe('Selector.prototype.getValues', () => {
  it('Should be a function', () => {
    expect(Selector.prototype.getValues).toBeInstanceOf(Function);
  });

  it('Should be return a key', () => {
    const res = Selector.prototype.getValues.call(context);

    expect(res).toEqual(['key2']);
  });
});

//* ------ Selector.prototype.setValues ------
describe('Selector.prototype.setValues', () => {
  it('Should be a function', () => {
    expect(Selector.prototype.setValues).toBeInstanceOf(Function);
  });

  it('Should be return a key', () => {
    Selector.prototype.setValues.call(context, ['key1', 'key3']);

    expect(context).toEqual({
      _key: 'key',
      _allValues: ['key1', 'key2', 'key3'],
      _values: ['key1', 'key3'],
    });
  });
});
