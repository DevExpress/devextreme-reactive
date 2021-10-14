import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { VERTICAL_GROUP_ORIENTATION, HORIZONTAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { TicksLayout } from './ticks-layout';

describe('Vertical view TimeScale', () => {
  let shallow;
  let classes;
  const defaultProps = {
    cellsData: [
      [
        { startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) },
        { startDate: new Date(2018, 6, 8, 16), endDate: new Date(2018, 6, 8, 18) },
      ],
      [
        { startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) },
        { startDate: new Date(2018, 6, 8, 18), endDate: new Date(2018, 6, 7, 20) },
      ],
    ],
    rowComponent: jest.fn(),
    cellComponent: jest.fn(),
    formatDate: () => undefined,
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TicksLayout {...defaultProps} />);
  });
  describe('TicksLayout', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <TicksLayout {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.table}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TicksLayout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render components properly', () => {
      const tree = shallow((
        <TicksLayout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(2);
    });
    it('should render components properly with vertical grouping', () => {
      const cellsData = [[{
        startDate: new Date(2018, 6, 7, 9),
        endDate: new Date(2018, 6, 7, 10),
        groupingInfo: 'groupingInfo1',
      }], [{
        startDate: new Date(2018, 6, 7, 10),
        endDate: new Date(2018, 6, 7, 11),
        groupingInfo: 'groupingInfo1',
        endOfGroup: true,
      }], [{
        startDate: new Date(2018, 6, 7, 9),
        endDate: new Date(2018, 6, 7, 10),
        groupingInfo: 'groupingInfo2',
      }], [{
        startDate: new Date(2018, 6, 7, 10),
        endDate: new Date(2018, 6, 7, 11),
        groupingInfo: 'groupingInfo2',
        endOfGroup: true,
      }]];

      const tree = shallow((
        <TicksLayout
          {...defaultProps}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
          cellsData={cellsData}
        />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(4);

      const cells = tree.find(defaultProps.cellComponent);
      expect(cells)
        .toHaveLength(4);
      expect(cells.at(0).props())
        .toEqual(cellsData[0][0]);
      expect(cells.at(1).props())
        .toEqual(cellsData[1][0]);
      expect(cells.at(2).props())
        .toEqual(cellsData[2][0]);
      expect(cells.at(3).props())
        .toEqual(cellsData[3][0]);
    });
    it('should work correctly with horizontal grouping', () => {
      const cellsData = [[{
        startDate: new Date(2018, 6, 7, 9),
        endDate: new Date(2018, 6, 7, 10),
        groupingInfo: 'groupingInfo1',
        endOfGroup: true,
      }], [{
        startDate: new Date(2018, 6, 7, 10),
        endDate: new Date(2018, 6, 7, 11),
        groupingInfo: 'groupingInfo1',
        endOfGroup: true,
      }]];

      const tree = shallow((
        <TicksLayout
          {...defaultProps}
          groupOrientation={HORIZONTAL_GROUP_ORIENTATION}
          cellsData={cellsData}
        />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);

      const cells = tree.find(defaultProps.cellComponent);
      expect(cells)
        .toHaveLength(2);
      expect(cells.at(0).props())
        .toEqual({
          ...cellsData[0][0],
          endOfGroup: false,
        });
      expect(cells.at(1).props())
        .toEqual({
          ...cellsData[1][0],
          endOfGroup: false,
        });
    });
    it('should render ticks for both timetable and all-day cells', () => {
      const cellsData = [[{
        startDate: new Date(2018, 6, 7, 9),
        endDate: new Date(2018, 6, 7, 10),
        groupingInfo: 'groupingInfo1',
      }], [{
        startDate: new Date(2018, 6, 7, 10),
        endDate: new Date(2018, 6, 7, 11),
        groupingInfo: 'groupingInfo1',
        endOfGroup: true,
      }], [{
        startDate: new Date(2018, 6, 7, 9),
        endDate: new Date(2018, 6, 7, 10),
        groupingInfo: 'groupingInfo2',
      }], [{
        startDate: new Date(2018, 6, 7, 10),
        endDate: new Date(2018, 6, 7, 11),
        groupingInfo: 'groupingInfo2',
        endOfGroup: true,
      }]];

      const tree = shallow((
        <TicksLayout
          {...defaultProps}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
          cellsData={cellsData}
          includeAllDayCell
          groupCount={2}
        />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(6);

      const cells = tree.find(defaultProps.cellComponent);
      expect(cells)
        .toHaveLength(6);
      expect(cells.at(0).props())
        .toEqual({
          ...cellsData[0][0],
          isAllDay: true,
          endOfGroup: false,
        });
      expect(cells.at(1).props())
        .toEqual(cellsData[0][0]);
      expect(cells.at(2).props())
        .toEqual(cellsData[1][0]);
      expect(cells.at(3).props())
        .toEqual({
          ...cellsData[2][0],
          isAllDay: true,
          endOfGroup: false,
        });
      expect(cells.at(4).props())
        .toEqual(cellsData[2][0]);
      expect(cells.at(5).props())
        .toEqual(cellsData[3][0]);
    });
  });
});
