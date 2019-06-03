import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { FixedCell } from './table-fixed-cell';
import { ThemeColors } from './layout';

const defaultProps = {
  column: { name: 'Test' },
  side: 'left',
  component: () => <span />,
};
const themeColors = {
  backgroundColor: 'red',
  borderColor: 'green',
};

describe('FixedCell', () => {
  it('should apply default style', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} />
    ));

    expect(tree.prop('style')).toMatchObject({
      position: 'sticky',
      backgroundClip: 'padding-box',
      zIndex: 300,
    });
  });

  it('should apply left border if left divider exists', () => {
    const tree = mount((
      <ThemeColors.Provider value={themeColors}>
        <FixedCell {...defaultProps} showLeftDivider />
      </ThemeColors.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      borderLeft: '1px solid green',
    });
  });

  it('should apply right border if right divider exists', () => {
    const tree = mount((
      <ThemeColors.Provider value={themeColors}>
        <FixedCell {...defaultProps} showRightDivider />
      </ThemeColors.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      borderRight: '1px solid green',
    });
  });

  it('should pass custom styles to the root element', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} style={{ color: 'white' }} />
    ));

    expect(tree.prop('style')).toMatchObject({
      color: 'white',
      position: 'sticky',
    });
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
      <ThemeColors.Provider value={themeColors}>
        <FixedCell {...defaultProps} />
      </ThemeColors.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      backgroundColor: 'red',
    });
  });

  it('should not apply background color for selected cells', () => {
    const tree = mount((
      <ThemeColors.Provider value={themeColors}>
        <FixedCell {...defaultProps} selected />
      </ThemeColors.Provider>
    ));

    expect(tree.childAt(0).prop('style').backgroundColor)
      .toBeFalsy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
