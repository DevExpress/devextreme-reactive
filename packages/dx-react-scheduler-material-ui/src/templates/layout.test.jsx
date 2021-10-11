import * as React from 'react';
import { createShallow } from '@mui/material/test-utils';
import { Root } from './layout';

describe('Root layout', () => {
  const defaultProps = {
    height: 300,
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} data={{ a: 1 }}>
        <div />
      </Root>
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 1 });
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} style={{ a: 1 }}>
        <div />
      </Root>
    ));

    expect(tree.prop('style'))
      .toMatchObject({ height: '300px', a: 1 });
  });

  it('should replace style of the root element', () => {
    const tree = shallow((
      <Root {...defaultProps} style={{ height: 1 }}>
        <div />
      </Root>
    ));

    expect(tree.prop('style'))
      .toMatchObject({ height: 1 });
  });
});
