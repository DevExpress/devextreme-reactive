import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { SelectionControl } from './selection-control';

describe('SelectionControl', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <SelectionControl className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should render indeterminate state checkbox if the `someSelected` property is true', () => {
    const tree = mount((
      <SelectionControl
        someSelected
      />
    ));

    expect(tree.find('input').getDOMNode().indeterminate)
      .toBeTruthy();
  });

  it('should not fire the `onToggle` event on cell click if selection is not available', () => {
    const onToggle = jest.fn();
    const tree = mount((
      <SelectionControl
        disabled
        onToggle={onToggle}
      />
    ));
    tree.find('input').simulate('change');

    expect(onToggle)
      .not.toHaveBeenCalled();
  });
});
