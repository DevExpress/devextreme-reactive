import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { SelectionControl } from './selection-control';

describe('SelectionControl', () => {
  it('should pass style to the root element', () => {
    const tree = shallow((
      <SelectionControl
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <SelectionControl className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should render indeterminate state checkbox if the `indeterminate` property is true', () => {
    const tree = mount((
      <SelectionControl
        indeterminate
      />
    ));

    expect(tree.find('input').getDOMNode().indeterminate)
      .toBeTruthy();
  });

  it('should not fire the `onChange` event on cell click if selection is not available', () => {
    const onChange = jest.fn();
    const tree = mount((
      <SelectionControl
        disabled
        onChange={onChange}
      />
    ));
    tree.find('input').simulate('change');

    expect(onChange)
      .not.toHaveBeenCalled();
  });
});
