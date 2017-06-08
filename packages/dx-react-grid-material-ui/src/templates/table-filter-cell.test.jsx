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

  test('should use the \'Filter...\' placeholder', () => {
    const tree = mountWithStyles(
      <TableFilterCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('Input').prop('placeholder')).toBe('Filter...');
  });
});
