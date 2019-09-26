import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import DeleteIcon from '@material-ui/icons/Delete';
import { DeleteButton } from './delete-button';

describe('AppointmentForm command', () => {
  const defaultProps = {
    onExecute: jest.fn(),
    id: 'id',
  };
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<DeleteButton />);
  });
  describe('DeleteButton', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <DeleteButton className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.button}.custom-class`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <DeleteButton data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should call onExecute by button click', () => {
      const tree = shallow((
        <DeleteButton {...defaultProps} />
      ));

      tree.simulate('click');
      expect(defaultProps.onExecute)
        .toBeCalled();
    });

    it('should contain DeleteIcon', () => {
      const tree = shallow((
        <DeleteButton {...defaultProps} />
      ));

      expect(tree.find(DeleteIcon))
        .toHaveLength(1);
    });
  });
});
