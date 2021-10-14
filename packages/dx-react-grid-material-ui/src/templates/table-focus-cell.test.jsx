import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { FocusCell } from './table-focus-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

const defaultProps = {
  component: () => <span />,
};

describe('FocusCell', () => {
  let shallow;
  let classes;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<FocusCell {...defaultProps} />);
  });
  it('should be rendered', () => {
    const tree = shallow((
      <FocusCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.component)).toBeTruthy();
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <FocusCell {...defaultProps} />
    ));

    expect(withKeyboardNavigation).toBeCalled();
  });

  it('should apply default className', () => {
    const tree = shallow((
      <FocusCell {...defaultProps} />
    ));

    expect(tree.is(`.${classes.simpleCell}`))
      .toBeTruthy();
  });

  it('should apply classNames if focused = true', () => {
    const tree = shallow((
      <FocusCell {...defaultProps} focused />
    ));

    expect(tree.is(`.${classes.focusedCell}`))
      .toBeTruthy();

    expect(tree.is(`.${classes.simpleCell}`))
      .toBeTruthy();
  });
});
