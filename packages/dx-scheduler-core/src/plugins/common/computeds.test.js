import { dayScale as dayScaleComputed, availableViews, viewCells } from './computeds';
import { monthCellsData } from '../month-view/computeds';

describe('#dayScale', () => {
  const currentDate = new Date(2018, 5, 24);
  it('should return default day units', () => {
    const units = dayScaleComputed(currentDate, 0, 7);
    expect(units).toHaveLength(7);
  });

  it('should return day units depend on first day of week', () => {
    let units = dayScaleComputed('2018-07-01', 1, 7);

    expect(units[0]).toEqual(new Date(2018, 5, 25));
    expect(units[6]).toEqual(new Date(2018, 6, 1));

    units = dayScaleComputed(currentDate, 3, 7);

    expect(units[0]).toEqual(new Date(2018, 5, 20));
    expect(units[6]).toEqual(new Date(2018, 5, 26));
  });

  it('should return day units depend on day count', () => {
    let units = dayScaleComputed(currentDate, 0, 5);

    expect(units[0]).toEqual(currentDate);
    expect(units[units.length - 1]).toEqual(new Date(2018, 5, 28));

    units = dayScaleComputed(currentDate, 0, 14);

    expect(units[0]).toEqual(currentDate);
    expect(units[units.length - 1]).toEqual(new Date(2018, 6, 7));
  });

  it('can exclude days', () => {
    const units = dayScaleComputed(currentDate, 0, 7, [0, 6]);

    expect(units).toHaveLength(5);
    expect(units[0]).toEqual(new Date(2018, 5, 25));
    expect(units[units.length - 1]).toEqual(new Date(2018, 5, 29));
  });

  it('can excluded days depend on day count', () => {
    const units = dayScaleComputed(currentDate, 0, 5, [1, 3]);

    expect(units).toHaveLength(3);
    expect(units[0]).toEqual(currentDate);
    expect(units[units.length - 1]).toEqual(new Date(2018, 5, 28));
  });

  it('should return day units for one day', () => {
    const units = dayScaleComputed('2018-07-01', undefined, 1);

    expect(units[0]).toEqual(new Date(2018, 6, 1));
  });

  it('should return day units for day depend on day count', () => {
    const units = dayScaleComputed('2018-07-01', undefined, 3);

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

describe('#viewCells', () => {
  it('should work when growDirection type is horizontal', () => {
    const currentDate = new Date('2018-10-11 10:00');
    const firstDayOfWeek = 1;
    const intervalCount = 1;
    const currentViewType = 'month';
    expect(viewCells(currentViewType, currentDate, firstDayOfWeek, intervalCount))
      .toEqual(monthCellsData(currentDate, firstDayOfWeek, intervalCount));
  });

  it('should work when growDirection type is vertical', () => {
    const currentDate = new Date('2018-10-11 10:00');
    const firstDayOfWeek = 1;
    const intervalCount = 1;
    const currentViewType = 'day';
    const dayScale = [new Date('2018-10-9'), new Date('2018-10-10')];
    const timeScale = [
      { start: new Date('2018-10-10 10:00'), end: new Date('2018-10-10 10:30') },
      { start: new Date('2018-10-10 10:30'), end: new Date('2018-10-10 11:00') },
    ];
    expect(
      viewCells(currentViewType, currentDate, firstDayOfWeek, intervalCount, dayScale, timeScale),
    ).toEqual([
      [
        { startDate: new Date('2018-10-9 10:00'), endDate: new Date('2018-10-9 10:30') },
        { startDate: new Date('2018-10-10 10:00'), endDate: new Date('2018-10-10 10:30') },
      ],
      [
        { startDate: new Date('2018-10-9 10:30'), endDate: new Date('2018-10-9 11:00') },
        { startDate: new Date('2018-10-10 10:30'), endDate: new Date('2018-10-10 11:00') },
      ],
    ]);
  });
});
