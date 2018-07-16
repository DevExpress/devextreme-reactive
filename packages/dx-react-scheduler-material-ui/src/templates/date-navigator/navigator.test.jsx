import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Navigator } from './navigator';

describe('DateNavigator', () => {
  let classes;
  let shallow;
  const Title = () => null;
  const NavigationButton = () => null;
  const defaultProps = {
    currentDate: '2018-07-12',
    titleComponent: Title,
    navigationButtonComponent: NavigationButton,
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
    it('should render title', () => {
      const title = shallow((
        <Navigator {...defaultProps} />
      )).find(Title);

      expect(title.exists())
        .toBeTruthy();
      expect(title.prop('currentDate'))
        .toBe('2018-07-12');
    });
    it('should render navigation buttons', () => {
      const buttons = shallow((
        <Navigator {...defaultProps} />
      )).find(NavigationButton);

      expect(buttons)
        .toHaveLength(2);
      expect(buttons.at(0).prop('back'))
        .toBeTruthy();
      expect(buttons.at(1).prop('back'))
        .toBeFalsy();
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
