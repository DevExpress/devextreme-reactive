import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Table } from './table';

jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    table: 'table',
  })),
}));

describe('Common view DayScale', () => {
  let shallow;
  const defaultProps = {
    cellsNumber: 0,
  };
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('Table', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Table {...defaultProps} data={{ a: 1 }}>
          <div />
        </Table>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
  it('should pass className to the root element', () => {
    const tree = shallow((
      <Table {...defaultProps} className="custom-class">
        <div />
      </Table>
    ));

    expect(tree.find('.custom-class'))
      .toBeTruthy();
    expect(tree.find('.table'))
      .toBeTruthy();
  });
});
