import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { FixedCell } from './table-fixed-cell';

const defaultProps = {
  column: { name: 'Test' },
  side: 'left',
  component: () => null,
};

describe('FixedCell', () => {
  let shallow;
  let classes;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<FixedCell {...defaultProps} />);
  });

  it('should apply selected styles for selected cell', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} selected />
    ));

    expect(tree.is(`.${classes.selected}`))
      .toBeTruthy();
  });

  it('should apply left border if left divider exists', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} showLeftDivider />
    ));

    expect(tree.is(`.${classes.dividerLeft}`))
      .toBeTruthy();
  });

  it('should apply right border if right divider exists', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} showRightDivider />
    ));

    expect(tree.is(`.${classes.dividerRight}`))
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} className="custom-class" />
    ));

    expect(tree.is(`.${classes.fixedCell}.custom-class`))
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

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <FixedCell {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
