import React from 'react';
import { mount } from 'enzyme';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  test('should have correct text alignment', () => {
    let tree = mount(
      <table>
        <thead>
          <tr>
            <TableCell
              column={{}}
            />
          </tr>
        </thead>
      </table>,
    );
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mount(
      <table>
        <thead>
          <tr>
            <TableCell
              column={{ align: 'left' }}
            />
          </tr>
        </thead>
      </table>,
    );
    expect(tree.find('td').prop('style').textAlign).toBe('left');

    tree = mount(
      <table>
        <thead>
          <tr>
            <TableCell
              column={{ align: 'right' }}
            />
          </tr>
        </thead>
      </table>,
    );
    expect(tree.find('td').prop('style').textAlign).toBe('right');
  });
});
