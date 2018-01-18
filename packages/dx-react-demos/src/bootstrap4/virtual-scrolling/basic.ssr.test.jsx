/**
 * @jest-environment node
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import Demo from './basic';

describe('BS4 virtual-scrolling: basic SSR', () => {
  it('should work', () => {
    expect(() => { renderToString(<Demo />); })
      .not.toThrow();
  });
});
