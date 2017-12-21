import React from 'react';
import { shallow } from 'enzyme';
import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <ToggleButton
        className="custom-class"
        onToggle={() => {}}
        getMessage={() => {}}
        refHandler={() => {}}
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
        data={{ a: 1 }}
        onToggle={() => {}}
        getMessage={() => {}}
        refHandler={() => {}}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
