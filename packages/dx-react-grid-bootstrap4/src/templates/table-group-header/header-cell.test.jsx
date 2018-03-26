import * as React from 'react';
import { shallow } from 'enzyme';
import { HeaderCell } from './header-cell';

describe('TableCell', () => {
  it('should render children and passed className', () => {
    const tree = shallow((
      <HeaderCell component={() => <div />} className="custom-class" />
    ));

    expect(tree.find('.custom-class.dx-rg-bs4-band.border-left.border-right').exists())
      .toBeTruthy();
  });

  it('should render pass restProps to root component', () => {
    const tree = shallow((
      <HeaderCell component={() => <div />} className="custom-class" style={{ color: 'red' }} />
    ));

    expect(tree.find('.custom-class').prop('style').color).toBe('red');
  });
});
