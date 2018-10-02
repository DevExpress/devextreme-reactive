import * as React from 'react';
import { shallow } from 'enzyme';
import { BandedHeaderCell } from './banded-header-cell';

const defaultProps = {
  component: () => <div />,
};

describe('BandedHeaderCell', () => {
  it('should render children and passed className', () => {
    const tree = shallow((
      <BandedHeaderCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.find('.custom-class.dx-g-bs4-banded-header-cell.border-right').exists())
      .toBeTruthy();
  });

  it('should render pass restProps to root component', () => {
    const tree = shallow((
      <BandedHeaderCell
        {...defaultProps}
        className="custom-class"
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('.custom-class').prop('style').color).toBe('red');
  });

  it('should apply left border if necessary', () => {
    const tree = shallow((
      <BandedHeaderCell
        beforeBorder
        {...defaultProps}
      />
    ));

    expect(tree.find('.border-left.dx-g-bs4-banded-header-cell.border-right').exists())
      .toBeTruthy();
  });
});
