import React from 'react';
import { mountWithStyles, setupConsole } from '../utils/testing';
import { TableHeaderCell } from './table-header-cell';

describe('TableHeaderCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('div').text()).toBe('Test');
  });
});
