import React from 'react';
import { shallow } from 'enzyme';
import { Tooltip } from 'material-ui';
import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
  it('should provide a hiddenColumns message text', () => {
    const tree = shallow((
      <ToggleButton
        data={{ a: 1 }}
        getMessage={key => key}
        onClick={() => {}}
        refHandler={() => {}}
      />
    ));

    expect(tree.find(Tooltip).props().title)
      .toBe('hiddenColumns');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <ToggleButton
        data={{ a: 1 }}
        getMessage={key => key}
        onClick={() => {}}
        refHandler={() => {}}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
