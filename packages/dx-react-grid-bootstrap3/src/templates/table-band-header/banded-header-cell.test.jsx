/* globals window:true */

import * as React from 'react';
import { shallow } from 'enzyme';
import { BandedHeaderCell } from './banded-header-cell';

jest.mock('react-dom', () => ({
  findDOMNode: jest.fn(() => null),
}));

const defaultProps = {
  component: () => <div />,
};

describe('BandedHeaderCell', () => {
  const { getComputedStyle } = window;
  beforeEach(() => {
    window.getComputedStyle = jest.fn().mockImplementation(() => ({}));
  });
  afterEach(() => {
    window.getComputedStyle = getComputedStyle;
  });

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
    const tree = shallow((
      <BandedHeaderCell
        {...defaultProps}
        className="custom-class"
        beforeBorder
      />
    ));

    tree.setState({ borderColor: 'red' });

    expect(tree.find('.custom-class').prop('style').borderRight)
      .toBe('1px solid red');
    expect(tree.find('.custom-class').prop('style').borderLeft)
      .toBe('1px solid red');
  });
});
