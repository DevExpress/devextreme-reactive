import * as React from 'react';
import { shallow } from 'enzyme';
import { BandedHeaderCell } from './banded-header-cell';

describe('BandedHeaderCell', () => {
  it('should render children and passed and pass restProps', () => {
    const tree = shallow((
      <BandedHeaderCell component={() => <div />} className="test" />
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass styles to the root element', () => {
    const tree = shallow((
      <BandedHeaderCell component={() => <div />} style={{ color: 'red' }} className="test" />
    ));

    expect(tree.find('.test').prop('style').color).toBe('red');
    expect(tree.find('.test').prop('style').borderRight).toBe('1px solid #ddd');
  });
});
