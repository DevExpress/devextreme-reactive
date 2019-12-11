import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Cell } from './cell';

jest.mock('@material-ui/core/styles', () => ({
  ...require.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    cell: 'cell',
    text: 'text',
  })),
}));

describe('GroupingPanel', () => {
  const defaultProps = {
    groupingItem: {},
    colSpan: 1,
    left: 0,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.cell'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render text item', () => {
      const tree = shallow((
        <Cell {...defaultProps} />
      ));

      expect(tree.find('.text'))
        .toBeTruthy();
    });
  });
});
