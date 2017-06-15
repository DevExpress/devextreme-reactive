import React from 'react';
import { mount } from 'enzyme';
import { TableHeaderCell } from './table-header-cell';

describe('TableHeaderCell', () => {
  it('should use column name if title is not specified', () => {
    const tree = mount(
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

    expect(tree.find('th > div').text()).toBe('Test');
  });
});
