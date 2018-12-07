import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { BandedHeaderCell } from './banded-header-cell';
import { ThemeColors } from '../layout';

const defaultProps = {
  component: () => <div />,
};

describe('BandedHeaderCell', () => {
  it('should render children and passed restProps', () => {
    const tree = shallow((
      <BandedHeaderCell
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.find('.custom-class').exists())
      .toBeTruthy();
  });

  it('should pass styles to the root element', () => {
    const tree = shallow((
      <BandedHeaderCell
        {...defaultProps}
        style={{ color: 'red' }}
        className="custom-class"
      />
    ));

    expect(tree.find('.custom-class').prop('style').color)
      .toBe('red');
    expect(tree.find('.custom-class').prop('style').borderTop)
      .toBe('none');
  });

  it('should apply left border if necessary', () => {
    const tree = mount((
      <ThemeColors.Provider value={{ borderColor: 'red' }}>
        <BandedHeaderCell
          {...defaultProps}
          className="custom-class"
          beforeBorder
        />
      </ThemeColors.Provider>
    ));

    tree.setState({ borderColor: 'red' });

    expect(tree.find('.custom-class').last().prop('style').borderRight)
      .toBe('1px solid red');
    expect(tree.find('.custom-class').last().prop('style').borderLeft)
      .toBe('1px solid red');
  });
});
