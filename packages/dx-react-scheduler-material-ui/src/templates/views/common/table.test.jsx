import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Table } from './table';

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
