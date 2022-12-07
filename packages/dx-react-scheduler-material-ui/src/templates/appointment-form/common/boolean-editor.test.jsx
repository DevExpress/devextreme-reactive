import * as React from 'react';
import { createMount, createShallow } from '@devexpress/dx-testing';
import { Checkbox } from '@mui/material';
import { BooleanEditor } from './boolean-editor';

describe('AppointmentForm common', () => {
  let mount;
  let shallow;
  const defaultProps = {
    label: 'label',
    onValueChange: jest.fn(),
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('BooleanEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <BooleanEditor {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should render checkbox as boolean editor', () => {
      const tree = mount((
        <BooleanEditor {...defaultProps} className="custom-class" />
      ));
      expect(tree.find(Checkbox).exists())
        .toBeTruthy();
    });

    it('should handle checkbox change', () => {
      const valueChangeMock = jest.fn();
      const { onChange } = mount((
        <BooleanEditor
          label="label"
          onValueChange={valueChangeMock}
        />
      )).find(Checkbox).props();
      onChange({ target: { checked: true } });

      expect(valueChangeMock).toBeCalledWith(true);
    });

    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <BooleanEditor
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });
  });
});
