import RangeSelector from './rangeSelector';

const context = {
  _key: 'price',
  _allValues: { min: 0, max: 100 },
  _values: { min: 20, max: 80 },
};

const data = [
  {
    indexImage: 0,
    indexAuthor: 2,
    year: 1234,

    urlToImage: 'string',

    artCategory: 'string',
    paintingTechnique: 'string',
    period: 'string',
    sellCategory: 'string',

    price: 100,
    stock: 1,

    inStock: true,
    last: true,

    inBag: false,
    inFavorite: false,
  },
  {
    indexImage: 1,
    indexAuthor: 2,
    year: 1234,

    urlToImage: 'string',

    artCategory: 'string',
    paintingTechnique: 'string',
    period: 'string',
    sellCategory: 'string',

    price: 50,
    stock: 1,

    inStock: true,
    last: true,

    inBag: false,
    inFavorite: false,
  },
  {
    indexImage: 2,
    indexAuthor: 2,
    year: 1234,

    urlToImage: 'string',

    artCategory: 'string',
    paintingTechnique: 'string',
    period: 'string',
    sellCategory: 'string',

    price: 80,
    stock: 1,

    inStock: true,
    last: true,

    inBag: false,
    inFavorite: false,
  },
];

//* ------ RangeSelector.prototype.constructor ------
describe('RangeSelector.prototype.constructor', () => {
  it('Should be a function', () => {
    expect(RangeSelector.prototype.constructor).toBeInstanceOf(Function);
  });

  it('Should be an instance', () => {
    const obj = new RangeSelector('price', { min: 0, max: 100 }, { min: 20, max: 80 });
    expect(obj.getKey()).toBe('price');
    expect(obj.getValues()).toEqual({ min: 20, max: 80 });
  });
});

//* ------ RangeSelector.prototype.filter ------
describe('RangeSelector.prototype.filter', () => {
  it('Should be a function', () => {
    expect(RangeSelector.prototype.filter).toBeInstanceOf(Function);
  });

  it('Should be return filtered data', () => {
    const res = RangeSelector.prototype.filter.call(context, data);

    expect(res).toEqual([
      {
        indexImage: 1,
        indexAuthor: 2,
        year: 1234,

        urlToImage: 'string',

        artCategory: 'string',
        paintingTechnique: 'string',
        period: 'string',
        sellCategory: 'string',

        price: 50,
        stock: 1,

        inStock: true,
        last: true,

        inBag: false,
        inFavorite: false,
      },
      {
        indexImage: 2,
        indexAuthor: 2,
        year: 1234,

        urlToImage: 'string',

        artCategory: 'string',
        paintingTechnique: 'string',
        period: 'string',
        sellCategory: 'string',

        price: 80,
        stock: 1,

        inStock: true,
        last: true,

        inBag: false,
        inFavorite: false,
      },
    ]);
  });
});

//* ------ RangeSelector.prototype.clearValues ------
describe('RangeSelector.prototype.clearValues', () => {
  it('Should be a function', () => {
    expect(RangeSelector.prototype.clearValues).toBeInstanceOf(Function);
  });

  it('Should be reset values', () => {
    RangeSelector.prototype.clearValues.call(context);

    expect(context).toEqual({
      _key: 'price',
      _allValues: { min: 0, max: 100 },
      _values: { min: 0, max: 100 },
    });
  });
});
