import { getDayScaleCellColSpan, getDayScaleCells } from './utils';

describe('#getDayScaleCellColSpan', () => {
  const viewCellsData = [[
    { startDate: new Date(2020, 0, 1, 0, 0) },
    { startDate: new Date(2020, 0, 1, 0, 0) },
    { startDate: new Date(2020, 0, 1, 0, 0) },
    { startDate: new Date(2020, 0, 2, 0, 0) },
  ]];
  it('should return col span depending on the number of different groups', () => {
    expect(getDayScaleCellColSpan(viewCellsData))
      .toEqual(3);
  });
});

describe('#getDayScaleCells', () => {
  it('should group cells if they are before the grouping panel', () => {
    const viewCellsData = [[{
      startDate: new Date(2020, 0, 1, 0, 0),
      endDate: new Date(2020, 0, 1, 1, 0),
      groupingInfo: 1,
    }, {
      startDate: new Date(2020, 0, 1, 0, 0),
      endDate: new Date(2020, 0, 1, 1, 0),
      groupingInfo: 2,
    }, {
      startDate: new Date(2020, 0, 2, 0, 0),
      endDate: new Date(2020, 0, 2, 1, 0),
      groupingInfo: 1,
    }, {
      startDate: new Date(2020, 0, 2, 0, 0),
      endDate: new Date(2020, 0, 2, 1, 0),
      groupingInfo: 2,
    }]];
    const cells = getDayScaleCells(viewCellsData, true);

    expect(cells)
      .toHaveLength(2);
    expect(cells[0])
      .toEqual({
        startDate: new Date(2020, 0, 1, 0, 0),
        endDate: new Date(2020, 0, 1, 1, 0),
        colSpan: 2,
        endOfGroup: true,
        key: '0',
        today: undefined,
      });
    expect(cells[1])
      .toEqual({
        startDate: new Date(2020, 0, 2, 0, 0),
        endDate: new Date(2020, 0, 2, 1, 0),
        colSpan: 2,
        endOfGroup: true,
        key: '2',
        today: undefined,
      });
  });
  it('should not group cells if they are after the grouping panel', () => {
    const viewCellsData = [[{
      startDate: new Date(2020, 0, 1, 0, 0),
      endDate: new Date(2020, 0, 1, 1, 0),
      groupingInfo: 1,
    }, {
      startDate: new Date(2020, 0, 2, 0, 0),
      endDate: new Date(2020, 0, 2, 1, 0),
      groupingInfo: 1,
      endOfGroup: true,
    }, {
      startDate: new Date(2020, 0, 1, 0, 0),
      endDate: new Date(2020, 0, 1, 1, 0),
      groupingInfo: 2,
    }, {
      startDate: new Date(2020, 0, 2, 0, 0),
      endDate: new Date(2020, 0, 2, 1, 0),
      groupingInfo: 2,
      endOfGroup: true,
    }]];
    const cells = getDayScaleCells(viewCellsData, false);

    expect(cells)
      .toHaveLength(4);
    expect(cells[0])
      .toEqual({
        startDate: new Date(2020, 0, 1, 0, 0),
        endDate: new Date(2020, 0, 1, 1, 0),
        endOfGroup: undefined,
        key: '0',
        today: undefined,
        groupingInfo: 1,
      });
    expect(cells[1])
      .toEqual({
        startDate: new Date(2020, 0, 2, 0, 0),
        endDate: new Date(2020, 0, 2, 1, 0),
        endOfGroup: true,
        key: '1',
        today: undefined,
        groupingInfo: 1,
      });
    expect(cells[2])
      .toEqual({
        startDate: new Date(2020, 0, 1, 0, 0),
        endDate: new Date(2020, 0, 1, 1, 0),
        endOfGroup: undefined,
        key: '2',
        today: undefined,
        groupingInfo: 2,
      });
    expect(cells[3])
      .toEqual({
        startDate: new Date(2020, 0, 2, 0, 0),
        endDate: new Date(2020, 0, 2, 1, 0),
        endOfGroup: true,
        key: '3',
        today: undefined,
        groupingInfo: 2,
      });
  });
});
