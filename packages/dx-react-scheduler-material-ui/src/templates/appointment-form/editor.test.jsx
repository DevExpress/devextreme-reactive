import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Editor } from './editor';

describe('Appointment Form', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    classes = getClasses(<Editor />);
    shallow = createShallow({ dive: true });
  });
  describe('Editor', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Editor className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.editor}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Editor data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
