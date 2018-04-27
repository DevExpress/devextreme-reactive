import * as React from 'react';
import { shallow } from 'enzyme';
import { Cell } from './cell';

describe('TableCell', () => {
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

    expect(tree.is('.custom-class.dx-g-bs4-banded-cell.text-nowrap.dx-g-bs4-table-cell.border-left.border-right.border-bottom'))
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
