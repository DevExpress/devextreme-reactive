import React from 'react';
import { mountWithStyles, setupConsole } from '../utils/testing';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <TableFilterCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('TextField').prop('label')).toBe('Test');
  });
});
