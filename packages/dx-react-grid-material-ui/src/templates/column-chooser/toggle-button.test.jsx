import * as React from 'react';
import { shallow } from 'enzyme';
import { Tooltip, IconButton } from '@mui/material';
import { ToggleButton } from './toggle-button';

const defaultProps = {
  onToggle: () => {},
  getMessage: key => key,
  buttonRef: () => {},
};

describe('ToggleButton', () => {
  it('should provide a correct message text', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find(Tooltip).props().title)
      .toBe('showColumnChooser');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <ToggleButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.find(IconButton).props().data)
      .toMatchObject({ a: 1 });
  });
});
