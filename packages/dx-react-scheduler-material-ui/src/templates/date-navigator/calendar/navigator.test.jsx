import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { Navigator } from './navigator';

describe('Calendar', () => {
  let classes;
  let shallow;
  const Text = () => null;
  const NavigationButton = () => null;
  const defaultProps = {
    currentDate: '2018-07-12',
    textComponent: Text,
    navigationButtonComponent: NavigationButton,
    formatDate: jest.fn(),
  };
  beforeAll(() => {
    classes = getClasses(<Navigator {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Navigator', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Navigator {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.navigator}`))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Navigator {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render text', () => {
      const formatDate = jest.fn();
      const text = shallow((
        <Navigator {...defaultProps} formatDate={formatDate} />
      )).find(Text);

      expect(text.exists())
        .toBeTruthy();
      expect(text.prop('currentDate'))
        .toBe('2018-07-12');
      expect(text.prop('formatDate'))
        .toBe(formatDate);
    });
    it('should render navigation buttons', () => {
      const buttons = shallow((
        <Navigator {...defaultProps} />
      )).find(NavigationButton);

      expect(buttons)
        .toHaveLength(2);
      expect(buttons.at(0).prop('type'))
        .toBe('back');
      expect(buttons.at(1).prop('type'))
        .toBe('forward');
    });
    it('should pass onNavigate handler to navigation buttons', () => {
      const onNavigate = jest.fn();
      const buttons = shallow((
        <Navigator
          {...defaultProps}
          onNavigate={onNavigate}
        />
      )).find(NavigationButton);

      buttons.at(0).props().onClick();
      buttons.at(1).props().onClick();
      expect(onNavigate.mock.calls[0][0].back)
        .toBeTruthy();
      expect(onNavigate.mock.calls[1][0].back)
        .toBeFalsy();
    });
  });
});
