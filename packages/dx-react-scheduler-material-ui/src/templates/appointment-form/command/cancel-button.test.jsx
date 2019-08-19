import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CloseIcon from '@material-ui/icons/Close';
import { CancelButton } from './cancel-button';

describe('AppointmentForm control', () => {
  const defaultProps = {
    onExecute: jest.fn(),
    id: 'id',
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('CancelButton', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <CancelButton data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should call onExecute by button click', () => {
      const tree = shallow((
        <CancelButton {...defaultProps} />
      ));

      tree.simulate('click');
      expect(defaultProps.onExecute)
        .toBeCalled();
    });

    it('should contain CloseIcon', () => {
      const tree = shallow((
        <CancelButton {...defaultProps} />
      ));

      expect(tree.find(CloseIcon))
        .toHaveLength(1);
    });
  });
});
