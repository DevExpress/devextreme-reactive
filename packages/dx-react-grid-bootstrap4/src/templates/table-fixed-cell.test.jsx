import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { FixedCell } from './table-fixed-cell';
import { BodyColorContext } from './layout';

const defaultProps = {
  column: { name: 'Test' },
  side: 'left',
  component: () => null,
};

describe('FixedCell', () => {
  it('should apply default classNames', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} />
    ));

    expect(tree.is('.position-sticky.dx-g-bs4-fixed-cell'))
      .toBeTruthy();
  });

  it('should apply inherit background color for selected cells', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} selected />
    ));

    expect(tree.prop('style')).toMatchObject({
      backgroundColor: 'inherit',
    });
  });

  it('should apply left border if left divider exists', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} showLeftDivider />
    ));

    expect(tree.is('.border-left'))
      .toBeTruthy();
  });

  it('should apply right border if right divider exists', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} showRightDivider />
    ));

    expect(tree.is('.border-right'))
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} className="custom-class" />
    ));

    expect(tree.is('.custom-class.position-sticky.dx-g-bs4-fixed-cell'))
      .toBeTruthy();
  });

  it('should apply position', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} position={200} />
    ));

    expect(tree.prop('style')).toMatchObject({
      left: 200,
    });
  });

  it('should apply background color', () => {
    const tree = mount((
      <BodyColorContext.Provider value="red">
        <FixedCell {...defaultProps} />
      </BodyColorContext.Provider>
    ));

    expect(tree.find('.dx-g-bs4-fixed-cell').prop('style')).toMatchObject({
      backgroundColor: 'red',
    });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
