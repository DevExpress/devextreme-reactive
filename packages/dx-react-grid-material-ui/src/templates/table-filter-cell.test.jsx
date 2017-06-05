import React from 'react';
import { mountWithStyles } from '../utils/testing';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  test('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <table>
        <thead>
          <tr>
            <TableFilterCell
              column={{
                name: 'Test',
              }}
            />
          </tr>
        </thead>
      </table>,
    );

    expect(tree.find('TextField').prop('label')).toBe('Test');
  });
});
