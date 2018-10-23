import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Checkbox from '@material-ui/core/Checkbox';
import { BooleanEditor } from './boolean-editor';

describe('Appointment Form', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  describe('BooleanEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <BooleanEditor className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should render checkbox as boolean editor', () => {
      const tree = shallow((
        <BooleanEditor className="custom-class" />
      ));
      expect(tree.dive().find(Checkbox).exists())
        .toBeTruthy();
    });

    it('should handle checkbox change', () => {
      const valueChangeMock = jest.fn();
      const { onChange } = shallow((
        <BooleanEditor
          onValueChange={valueChangeMock}
        />
      )).dive().find(Checkbox).props();
      onChange({ target: { checked: true } });

      expect(valueChangeMock).toBeCalledWith(true);
    });
  });
});
