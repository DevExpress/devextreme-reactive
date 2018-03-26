import * as React from 'react';
import { shallow } from 'enzyme';
import { HeaderCell } from './header-cell';

describe('TableCell', () => {
  it('should render children and passed and pass restProps', () => {
    const tree = shallow((
      <HeaderCell component={() => <div />} className="test" />
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass styles to the root element', () => {
    const tree = shallow((
      <HeaderCell component={() => <div />} style={{ color: 'red' }} className="test" />
    ));

    expect(tree.find('.test').prop('style').color).toBe('red');
    expect(tree.find('.test').prop('style').borderRight).toBe('1px solid #ddd');
  });
});
