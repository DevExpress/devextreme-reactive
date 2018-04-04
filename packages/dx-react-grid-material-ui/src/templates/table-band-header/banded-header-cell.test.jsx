import * as React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { BandedHeaderCell } from './banded-header-cell';

describe('BandedHeaderCell', () => {
  let shallow;
  const defaultProps = {
    component: () => <div />,
  };
  beforeAll(() => {
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
});
