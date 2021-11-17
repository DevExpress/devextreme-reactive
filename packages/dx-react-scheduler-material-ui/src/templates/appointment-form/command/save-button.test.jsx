import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { SaveButton, classes } from './save-button';

describe('AppointmentForm command', () => {
  const defaultProps = {
    onExecute: jest.fn(),
    getMessage: jest.fn(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('SaveButton', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <SaveButton className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.button}.custom-class`))
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
