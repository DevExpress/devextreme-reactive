import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { CommandButton } from './command-button';

describe('Appointment Form', () => {
  const defaultProps = {
    text: 'text',
    onExecute: jest.fn(),
    id: 'id',
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('CommandButton', () => {
    it('should pass restProps to the root element', () => {
      const tree = shallow((
        <CommandButton className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should call onExecute by button click', () => {
      const tree = shallow((
        <CommandButton {...defaultProps} />
      ));

      tree.simulate('click');
      expect(defaultProps.onExecute)
        .toBeCalled();
    });
  });
});
