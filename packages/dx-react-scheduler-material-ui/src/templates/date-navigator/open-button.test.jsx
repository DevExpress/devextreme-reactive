import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { OpenButton } from './open-button';

describe('DateNavigator', () => {
  const defaultProps = {
    onVisibilityToggle: jest.fn(),
  };
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<OpenButton />);
  });
  describe('OpenButton', () => {
    it('should pass rest props to buttons', () => {
      const tree = shallow((
        <OpenButton {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.find(Button).at(0).props().data)
        .toMatchObject({ a: 1 });
      expect(tree.find(IconButton).at(0).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should pass className to buttons', () => {
      const tree = shallow((
        <OpenButton {...defaultProps} className="custom-class" />
      ));

      const button = tree.find(Button).at(0);
      expect(button.is('.custom-class'))
        .toBeTruthy();
      expect(button.is(`.${classes.textButton}`))
        .toBeTruthy();

      const iconButton = tree.find(IconButton).at(0);
      expect(iconButton.is('.custom-class'))
        .toBeTruthy();
      expect(iconButton.is(`.${classes.iconButton}`))
        .toBeTruthy();
    });
    it('should handle onClink event', () => {
      const tree = shallow((
        <OpenButton {...defaultProps} />
      ));

      tree.find(Button).at(0).simulate('click');
      expect(defaultProps.onVisibilityToggle)
        .toBeCalledTimes(1);

      tree.find(IconButton).at(0).simulate('click');
      expect(defaultProps.onVisibilityToggle)
        .toBeCalledTimes(2);
    });
  });
});
