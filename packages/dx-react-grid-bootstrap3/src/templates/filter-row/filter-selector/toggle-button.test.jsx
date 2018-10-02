import * as React from 'react';
import { shallow } from 'enzyme';
import { ToggleButton } from './toggle-button';

const defaultProps = {
  onToggle: () => {},
  getMessage: key => key,
  buttonRef: () => {},
};

describe('ToggleButton', () => {
  it('should pass className to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        className="class"
      />
    ));

    expect(tree.is('.class'))
      .toBeTruthy();
    expect(tree.is('.btn.btn-default'))
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

  it('should pass children', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
      >
        <div className="content" />
      </ToggleButton>
    ));

    expect(tree.find('.content').exists())
      .toBeTruthy();
  });
});
