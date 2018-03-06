import * as React from 'react';
import { shallow } from 'enzyme';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  it('should have correct text alignment', () => {
    let tree = shallow(<TableCell />);
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = shallow(<TableCell tableColumn={{ align: 'left' }} />);
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = shallow(<TableCell tableColumn={{ align: 'right' }} />);
    expect(tree.find('td').prop('style').textAlign).toBe('right');

    tree = shallow(<TableCell tableColumn={{ align: 'center' }} />);
    expect(tree.find('td').prop('style').textAlign).toBe('center');
  });

  it('should have correct text', () => {
    const tree = shallow(<TableCell value="text" />);
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
