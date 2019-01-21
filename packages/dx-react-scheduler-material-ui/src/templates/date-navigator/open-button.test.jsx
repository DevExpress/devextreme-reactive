import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { OpenButton } from './open-button';

describe('DateNavigator', () => {
  const defaultProps = {
    onVisibilityToggle: jest.fn(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('OpenButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <OpenButton {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should handle onClink event', () => {
      const button = shallow((
        <OpenButton {...defaultProps} />
      ));
      button.simulate('click');

      expect(defaultProps.onVisibilityToggle)
        .toBeCalled();
    });
  });
});
