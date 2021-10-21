import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { BandedHeaderCell } from './banded-header-cell';

describe('BandedHeaderCell', () => {
  let shallow;
  let classes;
  const defaultProps = {
    component: () => <div />,
  };
  beforeAll(() => {
    classes = getClasses(<BandedHeaderCell {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  it('should render children and passed className', () => {
    const tree = shallow((
      <BandedHeaderCell {...defaultProps} className="custom-class" />
    ));

    expect(tree.find('.custom-class').exists())
      .toBeTruthy();
  });

  it('should render pass restProps to root component', () => {
    const tree = shallow((
      <BandedHeaderCell {...defaultProps} style={{ color: 'red' }} className="custom-class" />
    ));

    expect(tree.find('.custom-class').prop('style').color).toBe('red');
  });

  it('should apply left border if necessary', () => {
    const tree = shallow((
      <BandedHeaderCell {...defaultProps} beforeBorder className="custom-class" />
    ));

    expect(tree.is(`.${classes.headerCellBorder}`))
      .toBeTruthy();
    expect(tree.is(`.${classes.beforeBorder}`))
      .toBeTruthy();
  });
});
