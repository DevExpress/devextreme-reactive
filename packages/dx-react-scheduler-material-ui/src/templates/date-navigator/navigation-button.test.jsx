import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { NavigationButton } from './navigation-button';

describe('DateNavigator', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('NavigationButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <NavigationButton data={{ a: 1 }} type="forward" />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should render next button', () => {
      const next = shallow((
        <NavigationButton type="forward" />
      )).find(ChevronRight);

      expect(next.exists())
        .toBeTruthy();
    });
    it('should render prev button', () => {
      const prev = shallow((
        <NavigationButton type="back" />
      )).find(ChevronLeft);

      expect(prev.exists())
        .toBeTruthy();
    });
    it('should handle onClink event', () => {
      const onClick = jest.fn();
      const button = shallow((
        <NavigationButton onClick={onClick} type="forward" />
      ));
      button.simulate('click');

      expect(onClick)
        .toBeCalled();
    });
  });
});
