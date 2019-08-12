import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import Checkbox from '@material-ui/core/Checkbox';
import { BooleanEditor } from './boolean-editor';

describe('AppointmentForm common', () => {
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('BooleanEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = mount((
        <BooleanEditor className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });

    it('should render checkbox as boolean editor', () => {
      const tree = mount((
        <BooleanEditor className="custom-class" />
      ));
      expect(tree.find(Checkbox).exists())
        .toBeTruthy();
    });

    it('should handle checkbox change', () => {
      const valueChangeMock = jest.fn();
      const { onChange } = mount((
        <BooleanEditor
          onValueChange={valueChangeMock}
        />
      )).find(Checkbox).props();
      onChange({ target: { checked: true } });

      expect(valueChangeMock).toBeCalledWith(true);
    });
  });
});
