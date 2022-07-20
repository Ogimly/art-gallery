import DataModel from './dataModel';
import dataTest from './data/data-test.json';
import { artCategory, paintingTechnique, period, sellCategory } from '../abstract/const';

const context = {
  _data: [
    {
      inBag: false,
      inFavorite: true,
    },
    {
      inBag: true,
      inFavorite: false,
    },
    {
      inBag: true,
      inFavorite: true,
    },
  ],
};

//* ------ DataModel.prototype.getData ------
describe('DataModel.prototype.getData', () => {
  it('Should be a function', () => {
    expect(DataModel.prototype.getData).toBeInstanceOf(Function);
  });

  it('Should be return arr data', () => {
    const dataModel = new DataModel(dataTest);

    // const res = DataModel.prototype.getData.call(context);
    const res = dataModel.getData();

    res.forEach((el) => {
      expect(el).toHaveProperty('indexImage', 0);
      expect(el).toHaveProperty('indexAuthor', 0);
      expect(el).toHaveProperty('year', 1852);
      expect(el).toHaveProperty('urlToImage', './cut/0.jpg');

      expect(el).toHaveProperty('artCategory');
      expect(artCategory).toContain(el.artCategory);

      expect(el).toHaveProperty('paintingTechnique');
      expect(paintingTechnique).toContain(el.paintingTechnique);

      expect(el).toHaveProperty('period');
      expect(period).toContain(el.period);

      expect(el).toHaveProperty('artCategory');
      expect(sellCategory).toContain(el.sellCategory);

      expect(el).toHaveProperty('price');
      expect(el.price).toBeLessThan(100);
      expect(el.price).toBeGreaterThanOrEqual(20);

      expect(el).toHaveProperty('stock');
      expect(el.stock).toBeLessThan(11);
      expect(el.stock).toBeGreaterThanOrEqual(0);

      expect(el).toHaveProperty('inStock');
      expect(el.inStock).toBe(!(el.stock === 0));

      expect(el).toHaveProperty('last');
      expect(el.last).toBe(el.stock === 1);

      expect(el).toHaveProperty('inBag', false);
      expect(el).toHaveProperty('inFavorite', false);
    });

    // expect(res).toEqual(context._data);
  });
});

//* ------ DataModel.prototype.setOneInBag ------
describe('DataModel.prototype.setOneInBag', () => {
  it('Should be a function', () => {
    expect(DataModel.prototype.setOneInBag).toBeInstanceOf(Function);
  });

  it('Should be nothing if index is incorrect', () => {
    DataModel.prototype.setOneInBag.call(context, 10);

    expect(context).toEqual(context);
  });

  it('Should be add in bag (false -> true)', () => {
    DataModel.prototype.setOneInBag.call(context, 0);

    expect(context).toEqual({
      _data: [
        {
          inBag: true,
          inFavorite: true,
        },
        {
          inBag: true,
          inFavorite: false,
        },
        {
          inBag: true,
          inFavorite: true,
        },
      ],
    });
  });

  it('Should be remove from bag (true -> false)', () => {
    DataModel.prototype.setOneInBag.call(context, 1);

    expect(context).toEqual({
      _data: [
        {
          inBag: true,
          inFavorite: true,
        },
        {
          inBag: false,
          inFavorite: false,
        },
        {
          inBag: true,
          inFavorite: true,
        },
      ],
    });
  });
});

//* ------ DataModel.prototype.setInBag ------
describe('DataModel.prototype.setInBag', () => {
  it('Should be a function', () => {
    expect(DataModel.prototype.setInBag).toBeInstanceOf(Function);
  });

  it('Should be nothing if arr is empty', () => {
    DataModel.prototype.setInBag.call(context, []);

    expect(context).toEqual(context);
  });

  it('Should be set true if index in arr and false if not', () => {
    DataModel.prototype.setInBag.call(context, [1]);

    expect(context).toEqual({
      _data: [
        {
          inBag: false,
          inFavorite: true,
        },
        {
          inBag: true,
          inFavorite: false,
        },
        {
          inBag: false,
          inFavorite: true,
        },
      ],
    });
  });
});

//* ------ DataModel.prototype.setOneInFavorite ------
describe('DataModel.prototype.setOneInFavorite', () => {
  it('Should be a function', () => {
    expect(DataModel.prototype.setOneInFavorite).toBeInstanceOf(Function);
  });

  it('Should be nothing if index is incorrect', () => {
    DataModel.prototype.setOneInFavorite.call(context, 10);

    expect(context).toEqual(context);
  });

  it('Should be add in favorite (false -> true)', () => {
    DataModel.prototype.setOneInFavorite.call(context, 1);

    expect(context).toEqual({
      _data: [
        {
          inBag: false,
          inFavorite: true,
        },
        {
          inBag: true,
          inFavorite: true,
        },
        {
          inBag: false,
          inFavorite: true,
        },
      ],
    });
  });

  it('Should be remove from favorite (true -> false)', () => {
    DataModel.prototype.setOneInFavorite.call(context, 0);

    expect(context).toEqual({
      _data: [
        {
          inBag: false,
          inFavorite: false,
        },
        {
          inBag: true,
          inFavorite: true,
        },
        {
          inBag: false,
          inFavorite: true,
        },
      ],
    });
  });
});

//* ------ DataModel.prototype.setInFavorite ------
describe('DataModel.prototype.setInFavorite', () => {
  it('Should be a function', () => {
    expect(DataModel.prototype.setInFavorite).toBeInstanceOf(Function);
  });

  it('Should be nothing if arr is empty', () => {
    DataModel.prototype.setInFavorite.call(context, []);

    expect(context).toEqual(context);
  });

  it('Should be set true if index in arr and false if not', () => {
    DataModel.prototype.setInFavorite.call(context, [0, 1]);

    expect(context).toEqual({
      _data: [
        {
          inBag: false,
          inFavorite: true,
        },
        {
          inBag: true,
          inFavorite: true,
        },
        {
          inBag: false,
          inFavorite: false,
        },
      ],
    });
  });
});
