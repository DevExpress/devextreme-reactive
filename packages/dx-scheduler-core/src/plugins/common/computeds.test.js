import { dayScale, availableViews } from './computeds';

describe('#dayScale', () => {
  const currentDate = new Date(2018, 5, 24);
  it('should return default day units', () => {
    const units = dayScale(currentDate, 0, 7);
    expect(units).toHaveLength(7);
  });

  it('should return day units depend on first day of week', () => {
    let units = dayScale('2018-07-01', 1, 7);

    expect(units[0]).toEqual(new Date(2018, 5, 25));
    expect(units[6]).toEqual(new Date(2018, 6, 1));

    units = dayScale(currentDate, 3, 7);

    expect(units[0]).toEqual(new Date(2018, 5, 20));
    expect(units[6]).toEqual(new Date(2018, 5, 26));
  });

  it('should return day units depend on day count', () => {
    let units = dayScale(currentDate, 0, 5);

    expect(units[0]).toEqual(currentDate);
    expect(units[units.length - 1]).toEqual(new Date(2018, 5, 28));

    units = dayScale(currentDate, 0, 14);

    expect(units[0]).toEqual(currentDate);
    expect(units[units.length - 1]).toEqual(new Date(2018, 6, 7));
  });

  it('can exclude days', () => {
    const units = dayScale(currentDate, 0, 7, [0, 6]);

    expect(units).toHaveLength(5);
    expect(units[0]).toEqual(new Date(2018, 5, 25));
    expect(units[units.length - 1]).toEqual(new Date(2018, 5, 29));
  });

  it('can excluded days depend on day count', () => {
    const units = dayScale(currentDate, 0, 5, [1, 3]);

    expect(units).toHaveLength(3);
    expect(units[0]).toEqual(currentDate);
    expect(units[units.length - 1]).toEqual(new Date(2018, 5, 28));
  });

  it('should return day units for one day', () => {
    const units = dayScale('2018-07-01', undefined, 1);

    expect(units[0]).toEqual(new Date(2018, 6, 1));
  });

  it('should return day units for day depend on day count', () => {
    const units = dayScale('2018-07-01', undefined, 3);

    expect(units[0]).toEqual(new Date(2018, 6, 1));
    expect(units[1]).toEqual(new Date(2018, 6, 2));
    expect(units[2]).toEqual(new Date(2018, 6, 3));
  });
});
describe('#availableViews', () => {
  it('should return available views if views is not defined', () => {
    expect(availableViews(undefined, 'Month'))
      .toEqual(['Month']);
  });

  it('should return available views if view is expected', () => {
    expect(availableViews(['Month'], 'Month'))
      .toEqual(['Month']);
  });

  it('should return available views if view is not expected', () => {
    expect(availableViews(['Week'], 'Month'))
      .toEqual(['Week', 'Month']);
  });
});
