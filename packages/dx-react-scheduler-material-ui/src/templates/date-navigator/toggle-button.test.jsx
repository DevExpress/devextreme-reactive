import * as React from 'react';
import { shallow } from 'enzyme';
import { ToggleButton } from './toggle-button';

describe('DateNavigator', () => {
  const defaultProps = {
    onToggle: () => undefined,
    buttonRef: () => undefined,
  };
  describe('ToggleButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ToggleButton {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
