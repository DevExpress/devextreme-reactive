import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './layout';

const defaultProps = {
  width: 0, height: 100,
};

describe('Root', () => {
  it('should render List item', () => {
    const tree = shallow((
      <Root {...defaultProps}>
        <span />
      </Root>
    ));

    expect(tree.find('div'))
      .toHaveLength(1);
  });

  it('should render children item', () => {
    const tree = shallow((
      <Root {...defaultProps}>
        <span />
      </Root>
    ));
    const span = tree.find('div').children();

    expect(span)
      .toHaveLength(1);
    expect(span.type())
      .toEqual('span');
  });

  it('should apply style to root element', () => {
    const tree = shallow((
      <Root {...defaultProps} style={{ color: 'red' }}>
        <span />
      </Root>
    ));
    const { style } = tree.find('div').props();
    expect(style)
      .toEqual({
        height: '100px',
        color: 'red',
      });
  });

  it('should apply correct width', () => {
    const tree = shallow((
      <Root {...defaultProps} width={10}>
        <span />
      </Root>
    ));
    const { style } = tree.find('div').props();
    expect(style)
      .toEqual({
        width: '10px',
        height: '100px',
      });
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(
      <Root {...defaultProps} customProperty>
        <span />
      </Root>,
    );
    const { customProperty } = tree.find('div').props() as any;
    expect(customProperty)
      .toBeTruthy();
  });
});
