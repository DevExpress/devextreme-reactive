import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { FocusCell } from './table-focus-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

const defaultProps = {
  component: () => <span />,
};

describe('FocusCell', () => {
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

  it('should apply default classNames', () => {
    const tree = shallow((
      <FocusCell {...defaultProps} />
    ));

    expect(tree.find(defaultProps.component).props()).toEqual({ className: 'dx-g-bs4-simple-cell' });
  });

  it('should apply className if focus = true', () => {
    const tree = shallow((
      <FocusCell {...defaultProps} focused />
    ));

    expect(tree.find(defaultProps.component).props())
      .toEqual({ className: 'border border-primary dx-g-bs-focus-cell dx-g-bs4-simple-cell' });
  });
});
