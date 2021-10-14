import * as React from 'react';
import { create } from 'react-test-renderer';
import { Arrow } from './arrow';

describe('Arrow', () => {
  it('should render content', () => {
    const tree = create((
      <Arrow />
    ));

    expect(tree.root.findByType('div')).not.toBeNull();
  });
});
