import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { NavigationButton, classes } from './navigation-button';

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
    it('should pass className to the root element', () => {
      const tree = shallow((
        <NavigationButton className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
    });
  });
});
