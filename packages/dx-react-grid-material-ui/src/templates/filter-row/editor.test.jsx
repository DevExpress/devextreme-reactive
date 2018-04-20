import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import Input from 'material-ui/Input';
import { Editor } from './editor';

const defaultProps = {
  getMessage: key => key,
};

describe('Editor', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses((
      <Editor
        clientOffset={{ x: 10, y: 20 }}
      />
    ));
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Editor
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.find(Input).hasClass(classes.input))
      .toBeTruthy();
    expect(tree.find(Input).hasClass('custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Editor
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('can use filter placeholder', () => {
    const tree = shallow((
      <Editor
        {...defaultProps}
      />
    ));

    expect(tree.find(Input).prop('placeholder'))
      .toBe('filterPlaceholder');
  });
});
