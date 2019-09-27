import React from 'react';
import { shallow } from 'enzyme';
import { TableContainer } from './table-container';

describe('TableContainer', () => {
  it('should pass custom styles to the root element', () => {
    const tree = shallow((
      <TableContainer
        style={{ color: 'red' }}
      >
        <span />
      </TableContainer>
    ));

    expect(tree.find('div').at(0).prop('style'))
      .toMatchObject({
        color: 'red',
      });
  });

  it('should pass class to the root element', () => {
    const tree = shallow((
      <TableContainer className="custom-class">
        <div />
      </TableContainer>
    ));

    expect(tree.is('.table-responsive.custom-class'))
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

  it('should render a `div` block as a workaround Safari sticky bug', () => {
    // https://bugs.webkit.org/show_bug.cgi?id=175029
    const tree = shallow((
      <TableContainer>
        <div className="child" />
      </TableContainer>
    ));

    expect(tree.find('div').length)
      .toBe(3);
  });
});
