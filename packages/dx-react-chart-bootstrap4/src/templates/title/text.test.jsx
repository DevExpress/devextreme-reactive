import * as React from 'react';
import { create } from 'react-test-renderer';
import { Text } from './text';

describe('Text', () => {
  const defaultProps = {
    text: 'chart',
  };

  it('should render root element', () => {
    const tree = create((
      <Text
        {...defaultProps}
      />
    ));

    expect(tree.root.findByType('h3').props.children)
      .toBe('chart');
  });

  it('should pass the rest property to the root element', () => {
    const tree = create(<Text {...defaultProps} className="custom-class" />);
    expect(tree.root.findByType('h3').props.className).toBe('w-100 text-center mb-3 custom-class');
  });
});
