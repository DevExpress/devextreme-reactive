import * as React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { BandedHeaderCell } from './banded-header-cell';
import { groupCellHeight } from './cell';

describe('TableCell', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  it('should render children and passed className', () => {
    const tree = shallow((
      <BandedHeaderCell component={() => <div />} className="custom-class" />
    ));

    expect(tree.find('.custom-class').exists())
      .toBeTruthy();
  });

  it('should render pass restProps to root component', () => {
    const tree = shallow((
      <BandedHeaderCell component={() => <div />} className="custom-class" style={{ color: 'red' }} />
    ));

    expect(tree.find('.custom-class').prop('style').color).toBe('red');
  });

  it('should apply correct align if rowSpan is defined', () => {
    const rowSpan = 3;
    const tree = shallow((
      <BandedHeaderCell component={() => <div />} rowSpan={rowSpan} className="custom-class" />
    ));

    expect(tree.find('.custom-class').prop('style').paddingTop).toBe(`${(rowSpan - 1) * groupCellHeight}px`);
  });
});
