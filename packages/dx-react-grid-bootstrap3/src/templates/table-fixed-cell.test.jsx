import * as React from 'react';
import { mount } from 'enzyme';
import { FixedCell } from './table-fixed-cell';
import { StyleContext } from './layout';

const defaultProps = {
  column: { name: 'Test' },
  side: 'left',
  component: () => <span />,
};
const styleVars = {
  backgroundColor: 'red',
  borderColor: 'green',
  stickyPosition: 'stickyPosition',
};

describe('FixedCell', () => {
  it('should apply default style', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      position: 'stickyPosition',
      backgroundClip: 'padding-box',
      zIndex: 300,
    });
  });

  it('should apply left border if left divider exists', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} showLeftDivider />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      borderLeft: '1px solid green',
    });
  });

  it('should apply right border if right divider exists', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} showRightDivider />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      borderRight: '1px solid green',
    });
  });

  it('should pass custom styles to the root element', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} style={{ color: 'white' }} />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      color: 'white',
      position: 'stickyPosition',
    });
  });

  it('should apply position', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} position={200} />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      left: 200,
    });
  });

  it('should apply background color', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style')).toMatchObject({
      backgroundColor: 'red',
    });
  });

  it('should not apply background color for selected cells', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} selected />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('style').backgroundColor)
      .toBeFalsy();
  });

  it('should pass rest props to the root element', () => {
    const tree = mount((
      <StyleContext.Provider value={styleVars}>
        <FixedCell {...defaultProps} data={{ a: 1 }} />
      </StyleContext.Provider>
    ));

    expect(tree.childAt(0).prop('data'))
      .toMatchObject({ a: 1 });
  });
});
