import * as React from 'react';
import { createShallow, createMount } from '@material-ui/core/test-utils';
import { Root } from './root';

describe('DateNavigator', () => {
  describe('Root', () => {
    const OpenButton = () => null;
    const NavigationButton = () => null;
    const defaultProps = {
      onVisibilityToggle: () => {},
      onNavigate: () => {},
      rootRef: () => {},
      navigationButtonComponent: NavigationButton,
      openButtonComponent: OpenButton,
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
    it('should render open button', () => {
      const mount = createMount();
      const onVisibilityToggle = jest.fn();
      const openButton = mount((
        <Root
          {...defaultProps}
          navigatorText="a"
          onVisibilityToggle={onVisibilityToggle}
        />
      )).find(OpenButton);

      openButton.props().onVisibilityToggle();

      expect(openButton.exists())
        .toBeTruthy();
      expect(openButton.props().text)
        .toBe('a');
      expect(onVisibilityToggle)
        .toBeCalled();
      mount.cleanUp();
    });
    it('should render navigation buttons', () => {
      const mount = createMount();
      const onNavigate = jest.fn();
      const buttons = mount((
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
      expect(prev.props().type)
        .toBe('back');
      expect(next.props().type)
        .toBe('forward');
      expect(onNavigate.mock.calls[0][0])
        .toBe('back');
      expect(onNavigate.mock.calls[1][0])
        .toBe('forward');
      mount.cleanUp();
    });
  });
});
