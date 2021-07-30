import * as React from 'react';
import { shallow } from 'enzyme';
import { FocusRow } from './table-focus-row';

const defaultProps = {
  component: () => <span />,
};

describe('FocusRow', () => {
  it('should be rendered', () => {
    const tree = shallow((
      <FocusRow {...defaultProps} focused={false} />
    ));

    expect(tree.find(defaultProps.component)).toBeTruthy();
    expect(tree.find(defaultProps.component).props()).toEqual({ className: '' });
  });

  it('should apply classNames if focused = true', () => {
    const tree = shallow((
      <FocusRow {...defaultProps} focused />
    ));

    expect(tree.find(defaultProps.component).props()).toEqual({ className: 'table-active' });
  });
});
