import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import Input from '@mui/material/Input';
import { Editor } from './editor';

const defaultProps = {
  getMessage: key => key,
};

describe('Editor', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
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
