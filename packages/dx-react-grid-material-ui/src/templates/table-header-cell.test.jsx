import React from 'react';
import { mountWithStyles } from '../utils/testing';
import { TableHeaderCell } from './table-header-cell';

describe('TableHeaderCell', () => {
  test('should use column name if title is not specified', () => {
    const tree = mountWithStyles(
      <table>
        <thead>
          <tr>
            <TableHeaderCell
              column={{
                name: 'Test',
              }}
            />
          </tr>
        </thead>
      </table>,
    );

    expect(tree.find('div').text()).toBe('Test');
  });
});
