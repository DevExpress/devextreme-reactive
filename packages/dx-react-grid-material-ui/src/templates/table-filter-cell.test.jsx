import React from 'react';
import { format } from 'util';
import { setupConsole } from '@devexpress/dx-core';
import { mountWithStyles } from '../utils/testing';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'], formatOutput: format });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should use the \'Filter...\' placeholder', () => {
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
