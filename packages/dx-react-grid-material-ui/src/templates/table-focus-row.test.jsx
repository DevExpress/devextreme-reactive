import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { FocusRow, classes } from './table-focus-row';

const defaultProps = {
  component: () => <span />,
};

describe('FocusRow', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  it('should be rendered', () => {
    const tree = shallow((
      <FocusRow {...defaultProps} />
    ));

    expect(tree.find(defaultProps.component)).toBeTruthy();
    expect(tree.is(`.${classes.focusedRow}`))
      .toBeFalsy();
  });

  it('should apply classNames is focused', () => {
    const tree = shallow((
      <FocusRow {...defaultProps} focused />
    ));

    expect(tree.is(`.${classes.focusedRow}`))
      .toBeTruthy();
  });
});
