import * as React from 'react';
import { shallow } from 'enzyme';
import { Cell } from './cell';

describe('TableCell', () => {
  it('should have correct text', () => {
    const tree = shallow(<Cell value="text" />);
    expect(tree.find('th').text()).toBe('text');
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <Cell>
        <span className="test" />
      </Cell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <Cell className="custom-class" />
    ));

    expect(tree.is('.custom-class.text-nowrap.dx-rg-bs4-table-cell.border'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Cell data={{ a: 1 }} />
    ));
    expect(tree.find('th').prop('data'))
      .toMatchObject({ a: 1 });
  });
});
