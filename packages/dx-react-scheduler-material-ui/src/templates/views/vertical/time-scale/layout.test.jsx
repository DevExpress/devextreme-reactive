import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Layout, classes } from './layout';
import { TicksLayout } from './ticks-layout';

describe('Vertical view TimeScale', () => {
  let shallow;
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
    labelComponent: jest.fn(),
    rowComponent: jest.fn(),
    tickCellComponent: jest.fn(),
    formatDate: () => undefined,
  };
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('Layout', () => {
    it('should combine base class with custom', () => {
      const tree = shallow((
        <Layout {...defaultProps} className="custom-class" />
      ));

      expect(tree.hasClass('custom-class'))
        .toBe(true);
      expect(tree.hasClass(classes.flexRow))
        .toBe(true);
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render its components properly', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(`.${classes.timeScaleContainer}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.ticks}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.cell}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.verticalCell}`))
        .toHaveLength(0);
    });
    it('should render array of time labels and TicksLayout', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(3);
      expect(labels.at(0).prop('time'))
        .toBeUndefined();
      expect(labels.at(1).prop('time'))
        .toEqual(expect.any(Date));
      expect(labels.at(2).prop('time'))
        .toBeUndefined();

      expect(tree.find(TicksLayout))
        .toHaveLength(1);
    });
    it('should work correctly with Vertical grouping', () => {
      const groups = [[
        { id: 1 }, { id: 2 },
      ]];
      const cellsData = [
        [{ startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) }],
        [{ startDate: new Date(2018, 6, 8, 16), endDate: new Date(2018, 6, 8, 18) }],
        [{ startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) }],
        [{ startDate: new Date(2018, 6, 8, 18), endDate: new Date(2018, 6, 7, 20) }],
      ];
      const tree = shallow((
        <Layout
          {...defaultProps}
          cellsData={cellsData}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
          groups={groups}
        />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(6);
      expect(labels.at(0).prop('time'))
        .toBeUndefined();
      expect(labels.at(1).prop('time'))
        .toEqual(expect.any(Date));
      expect(labels.at(2).prop('time'))
        .toBeUndefined();
      expect(labels.at(3).prop('time'))
        .toBeUndefined();
      expect(labels.at(4).prop('time'))
        .toEqual(expect.any(Date));
      expect(labels.at(5).prop('time'))
        .toBeUndefined();

      expect(tree.find(`.${classes.cell}`))
        .toHaveLength(2);
      expect(tree.find(`.${classes.verticalCell}`))
        .toHaveLength(2);
    });
    it('should render labels and all-day title', () => {
      const groups = [[
        { id: 1 }, { id: 2 },
      ]];
      const cellsData = [
        [{ startDate: new Date(2018, 6, 7, 16), endDate: new Date(2018, 6, 7, 18) }],
        [{ startDate: new Date(2018, 6, 8, 16), endDate: new Date(2018, 6, 8, 18) }],
        [{ startDate: new Date(2018, 6, 7, 18), endDate: new Date(2018, 6, 7, 20) }],
        [{ startDate: new Date(2018, 6, 8, 18), endDate: new Date(2018, 6, 7, 20) }],
      ];
      const allDayTitle = jest.fn();
      const tree = shallow((
        <Layout
          {...defaultProps}
          cellsData={cellsData}
          groupOrientation={VERTICAL_GROUP_ORIENTATION}
          groups={groups}
          allDayTitleComponent={allDayTitle}
          showAllDayTitle
        />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(6);
      expect(labels.at(0).prop('time'))
        .toBeUndefined();
      expect(labels.at(1).prop('time'))
        .toEqual(expect.any(Date));
      expect(labels.at(2).prop('time'))
        .toBeUndefined();
      expect(labels.at(3).prop('time'))
        .toBeUndefined();
      expect(labels.at(4).prop('time'))
        .toEqual(expect.any(Date));
      expect(labels.at(5).prop('time'))
        .toBeUndefined();

      const allDayTitles = tree.find(allDayTitle);
      expect(allDayTitles)
        .toHaveLength(2);
      expect(allDayTitles.at(0).prop('fixedHeight'))
        .toBeTruthy();
      expect(allDayTitles.at(1).prop('fixedHeight'))
        .toBeTruthy();

      expect(tree.find(`.${classes.cell}`))
        .toHaveLength(2);
      expect(tree.find(`.${classes.verticalCell}`))
        .toHaveLength(2);
    });
  });
});
