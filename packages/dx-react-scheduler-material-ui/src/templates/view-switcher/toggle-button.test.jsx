import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { ToggleButton } from './toggle-button';

describe('ViewSwitcher', () => {
  let mount;
  const defaultProps = {
    targetRef: jest.fn(),
    currentView: 'Week',
  };
  beforeAll(() => {
    mount = createMount({ dive: true });
  });

  describe('ToggleButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <ToggleButton {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should handle button lick', () => {
      const props = {
        onToggle: jest.fn(),
      };
      const tree = mount((
        <ToggleButton {...defaultProps} {...props} />
      ));

      tree.simulate('click');

      // eslint-disable-next-line react/destructuring-assignment
      expect(props.onToggle)
        .toBeCalled();
    });
  });
});
