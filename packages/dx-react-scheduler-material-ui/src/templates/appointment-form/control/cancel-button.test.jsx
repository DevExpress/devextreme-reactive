import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { CancelButton } from './cancel-button';

describe('Appointment Form', () => {
  const defaultProps = {
    onExecute: jest.fn(),
    id: 'id',
  };
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<CancelButton />);
  });
  describe('CancelButton', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <CancelButton className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
    });

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
  });
});
