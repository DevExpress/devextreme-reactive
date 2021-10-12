import * as React from 'react';
import { mount } from 'enzyme';
import { FocusRow } from './table-focus-row';

const defaultProps = {
  component: () => <span />,
};

describe('FocusRow', () => {
  it('should be rendered', () => {
    const tree = mount((
      <FocusRow {...defaultProps} />
    ));

    expect(tree.find(defaultProps.component)).toBeTruthy();
    expect(tree.find(defaultProps.component).props()).toEqual({ className: '' });
  });

  it('should apply className, if focused is true', () => {
    const tree = mount((
      <FocusRow {...defaultProps} focused />
    ));

    expect(tree.find(defaultProps.component).props()).toEqual({ className: 'active' });
  });
});
