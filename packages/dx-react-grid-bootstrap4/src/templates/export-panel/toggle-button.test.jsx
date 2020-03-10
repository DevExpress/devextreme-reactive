import * as React from 'react';
import { shallow } from 'enzyme';
import { ToggleButton } from './toggle-button';

const defaultProps = {
  onToggle: () => {},
  getMessage: key => key,
  buttonRef: () => {},
};

describe('ToggleButton', () => {
  it('should pass rest props to the button element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should pass className to the button element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        className="test"
      />
    ));

    expect(tree.is('.btn.btn-outline-secondary.test'))
      .toBeTruthy();
  });
});
