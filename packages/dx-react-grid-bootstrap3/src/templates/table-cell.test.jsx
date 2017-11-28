import React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  const mountTableCell = column =>
    shallow((
      <TableCell
        column={column}
        value="text"
      />
    ));

  it('should have correct text alignment', () => {
    let tree = mountTableCell({});
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mountTableCell({ align: 'left' });
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mountTableCell({ align: 'right' });
    expect(tree.find('td').prop('style').textAlign).toBe('right');
  });

  it('should have correct text', () => {
    const tree = mountTableCell({});
    expect(tree.find('td').text()).toBe('text');
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableCell>
        <span className="test" />
      </TableCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
