import * as React from 'react';
import { create } from 'react-test-renderer';
import { Sheet } from './sheet';

describe('Sheet', () => {
  it('should render content', () => {
    const tree = create((
      <Sheet />
    ));

    expect(tree.root.findByType('div')).not.toBeNull();
  });
});
