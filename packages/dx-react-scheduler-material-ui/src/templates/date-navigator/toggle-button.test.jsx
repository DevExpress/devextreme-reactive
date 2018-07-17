import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Button from '@material-ui/core/Button';
import { ToggleButton } from './toggle-button';

describe('DateNavigator', () => {
  const defaultProps = {
    onToggle: () => null,
  };
  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<ToggleButton {...defaultProps} />);
    mount = createMount();
  });
  describe('ToggleButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <ToggleButton {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should pass className to the root element', () => {
      const tree = mount((
        <ToggleButton {...defaultProps} className="custom-class" />
      )).find(Button);

      expect(tree.hasClass('custom-class'))
        .toBeTruthy();
      expect(tree.hasClass(classes.button))
        .toBeTruthy();
    });
    it('should handle the "onClick" event', () => {
      const onToggle = jest.fn();
      mount((
        <ToggleButton
          onToggle={onToggle}
        />
      )).find(Button).simulate('click');

      expect(onToggle)
        .toBeCalled();
    });
    it('should render title', () => {
      const title = mount((
        <ToggleButton
          {...defaultProps}
          title="a"
        />
      )).find(Button);
      expect(title.text())
        .toBe('a');
    });
  });
});
