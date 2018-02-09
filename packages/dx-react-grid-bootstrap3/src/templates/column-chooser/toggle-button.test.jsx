import * as React from 'react';
import { shallow } from 'enzyme';
import { ToggleButton } from './toggle-button';

const defaultProps = {
  onToggle: () => {},
  getMessage: () => {},
  buttonRef: () => {},
};

describe('ToggleButton', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.btn-link'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
