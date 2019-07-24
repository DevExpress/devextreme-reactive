import * as React from 'react';
import { shallow } from 'enzyme';
import { Sheet } from './sheet';

describe('Content', () => {
  const defaultProps = {
    className: 'custom_class_name',
    placement: 'placement',
  };

  it('should render content', () => {
    const tree = shallow((
      <Sheet
        {...defaultProps}
      />
    ));

    expect(tree.find('div').props()).toEqual({ className: 'popover-body custom_class_name', placement: 'placement' });
  });
});
