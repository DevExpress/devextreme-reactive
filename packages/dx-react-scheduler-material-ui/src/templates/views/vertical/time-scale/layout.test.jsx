import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Layout } from './layout';
import { TicksLayout } from './ticks-layout';

jest.mock('@material-ui/core/styles', () => ({
  ...require.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    timeScaleContainer: 'timeScaleContainer',
    ticks: 'ticks',
    cell: 'cell',
  })),
}));

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

      expect(tree.find('.timeScaleContainer').exists())
        .toBeTruthy();
      expect(tree.find('.ticks').exists())
        .toBeTruthy();
      expect(tree.find('.cell'))
        .toHaveLength(1);
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

      expect(tree.find('.cell'))
        .toHaveLength(2);
    });
  });
});
