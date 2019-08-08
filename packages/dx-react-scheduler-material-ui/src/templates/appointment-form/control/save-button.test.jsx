import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { SaveButton } from './save-button';

describe('Appointment Form', () => {
  const defaultProps = {
    onExecute: jest.fn(),
    id: 'id',
    getMessage: jest.fn(),
  };
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<SaveButton><div /></SaveButton>);
  });
  describe('SaveButton', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <SaveButton className="custom-class" {...defaultProps} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.button}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <SaveButton data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.prop('data'))
        .toMatchObject({ a: 1 });
    });

    it('should call onExecute by button click', () => {
      const tree = shallow((
        <SaveButton {...defaultProps} />
      ));

      tree.simulate('click');
      expect(defaultProps.onExecute)
        .toBeCalled();
    });

    it('should call getMessage function with proper parameter', () => {
      shallow((
        <SaveButton {...defaultProps} />
      ));

      expect(defaultProps.getMessage)
        .toBeCalledWith('commitCommand');
    });
  });
});
