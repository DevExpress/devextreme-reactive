import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { getVerticalCellsFromGroups, VIEW_TYPES } from '@devexpress/dx-scheduler-core';
import { VerticalLayout } from './vertical-layout';
import { BASIC_CELL_HEIGHT } from '../constants';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getVerticalCellsFromGroups: jest.fn(),
}));

describe('GroupingPanel', () => {
  const defaultProps = {
    rowSpan: 40,
    groups: [[{ text: 'test' }]],
    rowComponent: () => null,
    cellComponent: () => null,
    viewType: VIEW_TYPES.WEEK,
  };
  const groups = [[
    { text: '1' },
    { text: '2' },
  ], [
    { text: '3' },
    { text: '4' },
    { text: '3' },
    { text: '4' },
  ]];
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<VerticalLayout {...defaultProps} />);
  });
  beforeEach(() => {
    getVerticalCellsFromGroups.mockImplementation(() => [{ rowSpan: 1 }]);
  });
  afterEach(jest.resetAllMocks);

  describe('HorizontalLayout', () => {
    it('should pass rest props to the root component', () => {
      const tree = shallow((
        <VerticalLayout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <VerticalLayout {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.layout}`))
        .toBeTruthy();
    });

    it('should render row and cells depending on groups prop', () => {
      const tree = shallow((
        <VerticalLayout {...defaultProps} groups={groups} />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(4);
      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(4);
    });

    it('should call "getVerticalCellsFromGroups"', () => {
      shallow((
        <VerticalLayout {...defaultProps} groups={groups} showHeaderForEveryDate colSpan={12} />
      ));

      expect(getVerticalCellsFromGroups)
        .toHaveBeenCalledTimes(4);
      expect(getVerticalCellsFromGroups)
        .toHaveBeenCalledWith(groups, 0, defaultProps.rowSpan, BASIC_CELL_HEIGHT[VIEW_TYPES.WEEK]);
      expect(getVerticalCellsFromGroups)
        .toHaveBeenCalledWith(groups, 1, defaultProps.rowSpan, BASIC_CELL_HEIGHT[VIEW_TYPES.WEEK]);
      expect(getVerticalCellsFromGroups)
        .toHaveBeenCalledWith(groups, 2, defaultProps.rowSpan, BASIC_CELL_HEIGHT[VIEW_TYPES.WEEK]);
      expect(getVerticalCellsFromGroups)
        .toHaveBeenCalledWith(groups, 3, defaultProps.rowSpan, BASIC_CELL_HEIGHT[VIEW_TYPES.WEEK]);
    });
  });
});
