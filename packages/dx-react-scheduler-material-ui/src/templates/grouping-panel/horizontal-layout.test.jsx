import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import { getRowFromGroups } from '@devexpress/dx-scheduler-core';
import { HorizontalLayout } from './horizontal-layout';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  getRowFromGroups: jest.fn(),
}));

describe('GroupingPanel', () => {
  const defaultProps = {
    colSpan: 4,
    groups: [[{ text: 'test' }]],
    rowComponent: () => null,
    cellComponent: () => null,
    cellStyle: {},
  };
  const groups = [[{
    text: '1',
  }, {
    text: '2',
  }], [{
    text: '3',
  }, {
    text: '4',
  }, {
    text: '3',
  }, {
    text: '4',
  }]];
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  beforeEach(() => {
    getRowFromGroups.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  describe('HorizontalLayout', () => {
    it('should pass rest props to rows', () => {
      const tree = shallow((
        <HorizontalLayout {...defaultProps} data={{ a: 1 }} />
      ));

      const rows = tree.find(defaultProps.rowComponent);
      expect(rows.at(0).prop('data'))
        .toMatchObject({ a: 1 });
      expect(getRowFromGroups)
        .not.toBeCalled();
    });

    it('should render row and cells depending on groups prop', () => {
      const tree = shallow((
        <HorizontalLayout {...defaultProps} groups={groups} />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(6);
    });

    it('should call "getRowFromGroups"', () => {
      shallow((
        <HorizontalLayout {...defaultProps} groups={groups} showHeaderForEveryDate colSpan={12} />
      ));

      expect(getRowFromGroups)
        .toHaveBeenCalledTimes(2);
      expect(getRowFromGroups)
        .toHaveBeenCalledWith(12, groups[0], defaultProps.cellStyle, groups, 0);
      expect(getRowFromGroups)
        .toHaveBeenCalledWith(12, groups[1], defaultProps.cellStyle, groups, 1);
    });
  });
});
