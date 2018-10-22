import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import Input from '@material-ui/core/Input';
import { Editor } from './editor';
import {shallow} from "enzyme/build";

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

  it('should pass undefined as value if value is empty', function() {
    const onChange = jest.fn();
    const tree = shallow((
      <Editor
        {...defaultProps}
        onChange={onChange}
      />
    ));

    tree.simulate('change', { target: { value: '' }});

    expect(onChange)
      .toHaveBeenCalledWith(undefined);
  });
});
