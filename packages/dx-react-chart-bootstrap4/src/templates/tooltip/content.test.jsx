import * as React from 'react';
import { create } from 'react-test-renderer';
import { Content } from './content';

describe('Content', () => {
  const defaultProps = {
    text: 'text-content',
  };

  it('should render content', () => {
    const tree = create((
      <Content
        {...defaultProps}
      />
    ));

    expect(tree.root.findByType('span').props.children).toBe('text-content');
  });
});
