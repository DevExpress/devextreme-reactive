import * as React from 'react';
import { shallow } from 'enzyme';
import { BandedHeaderCell } from './banded-header-cell';

describe('BandedHeaderCell', () => {
  const defaultProps = {
    component: () => <div />,
    className: 'custom-class',
  };
  it('should render children and passed and pass restProps', () => {
    const tree = shallow((
      <BandedHeaderCell {...defaultProps} />
    ));

    expect(tree.find('.custom-class').exists())
      .toBeTruthy();
  });

  it('should pass styles to the root element', () => {
    const tree = shallow((
      <BandedHeaderCell {...defaultProps} style={{ color: 'red' }} />
    ));

    expect(tree.find('.custom-class').prop('style').color).toBe('red');
    expect(tree.find('.custom-class').prop('style').borderRight).toBe('1px solid #ddd');
  });
});
