import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Root } from './root';

describe('DateNavigator', () => {
  describe('Root', () => {
    const ToggleButton = () => null;
    const NavigationButton = () => null;
    const defaultProps = {
      onToggle: () => {},
      onNavigate: () => {},
      targetRef: () => {},
      navigationButtonComponent: NavigationButton,
      toggleButtonComponent: ToggleButton,
    };
    let shallow;
    beforeAll(() => {
      shallow = createShallow();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Root {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render toggle button', () => {
      const onToggle = jest.fn();
      const toggleButton = shallow((
        <Root
          {...defaultProps}
          navigatorTitle="a"
          onToggle={onToggle}
        />
      )).find(ToggleButton);

      toggleButton.props().onToggle();

      expect(toggleButton.exists())
        .toBeTruthy();
      expect(toggleButton.props().title)
        .toBe('a');
      expect(onToggle)
        .toBeCalled();
    });
    it('should render navigation buttons', () => {
      const onNavigate = jest.fn();
      const buttons = shallow((
        <Root
          {...defaultProps}
          onNavigate={onNavigate}
        />
      )).find(NavigationButton);
      const prev = buttons.at(0);
      const next = buttons.at(1);

      prev.props().onClick();
      next.props().onClick();

      expect(buttons)
        .toHaveLength(2);
      expect(prev.props().back)
        .toBeTruthy();
      expect(next.props().back)
        .toBeFalsy();
      expect(onNavigate.mock.calls[0][0].back)
        .toBeTruthy();
      expect(onNavigate.mock.calls[1][0].back)
        .toBeFalsy();
    });
  });
});
