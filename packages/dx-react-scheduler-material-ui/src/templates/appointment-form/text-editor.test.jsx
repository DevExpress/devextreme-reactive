import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TextEditor } from './text-editor';

describe('Appointment Form', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    classes = getClasses(<TextEditor />);
    shallow = createShallow({ dive: true });
  });
  describe('TextEditor', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <TextEditor className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.editor}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <TextEditor data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
