import React from 'react';
import { shallow } from 'enzyme';
import { TableContainer } from './table-container';

describe('TableContainer', () => {
  it('should pass class to the root element', () => {
    const tree = shallow((
      <TableContainer className="custom-class">
        <div />
      </TableContainer>
    ));

    expect(tree.is('.table-responsive.dx-rg-bs4-table-container.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableContainer data={{ a: 1 }}>
        <div />
      </TableContainer>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
