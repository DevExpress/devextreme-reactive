import * as React from 'react';
import { shallow } from 'enzyme';
import { Editor } from './editor';

const defaultProps = {
  getMessage: key => key,
};

describe('Editor', () => {
  it('should render a readonly input if disabled', () => {
    const tree = shallow((
      <Editor
        {...defaultProps}
        disabled
      />
    ));

    expect(tree.find('input').prop('readOnly'))
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Editor
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.form-control'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
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
});
