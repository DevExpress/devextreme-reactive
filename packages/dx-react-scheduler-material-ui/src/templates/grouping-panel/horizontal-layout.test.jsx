import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { HorizontalLayout } from './horizontal-layout';

describe('GroupingPanel', () => {
  const defaultProps = {
    width: 7,
    groups: [[{ text: 'test' }]],
    rowComponent: () => null,
    cellComponent: () => null,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('HorizontalLayout', () => {
    it('should pass rest props to rows', () => {
      const tree = shallow((
        <HorizontalLayout {...defaultProps} data={{ a: 1 }} />
      ));

      const rows = tree.find(defaultProps.rowComponent);
      expect(rows.at(0).prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should render row and cells depending on groups prop',() => {
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
      const tree = shallow((
        <HorizontalLayout {...defaultProps} groups={groups} />
      ));

      expect(tree.find(defaultProps.rowComponent))
        .toHaveLength(2);
      expect(tree.find(defaultProps.cellComponent))
        .toHaveLength(6);
    });
  });
});
