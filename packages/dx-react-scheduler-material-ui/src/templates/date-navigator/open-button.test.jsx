import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { OpenButton, classes } from './open-button';

describe('DateNavigator', () => {
  const defaultProps = {
    onVisibilityToggle: jest.fn(),
  };
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  describe('OpenButton', () => {
    it('should pass rest props to buttons', () => {
      const tree = mount((
        <OpenButton {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.find(Button).at(0).props().data)
        .toMatchObject({ a: 1 });
      expect(tree.find(IconButton).at(0).props().data)
        .toMatchObject({ a: 1 });
    });
    it('should pass className to buttons', () => {
      const tree = mount((
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
      const tree = mount((
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
