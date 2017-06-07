import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext } from '@devexpress/dx-react-core';
import { TableHeaderCell } from './table-header-cell';

describe('TableHeaderCell', () => {
  test('should use column name if title is not specified', () => {
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

  test('should have correct styles when user interaction disallowed', () => {
    const tree = mount(
      <table>
        <thead>
          <tr>
            <TableHeaderCell
              column={{}}
            />
          </tr>
        </thead>
      </table>,
    );

    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
      });

    expect(tree.find('th').prop('style').cursor)
      .toBeUndefined();
  });

  test('should have correct styles when sorting is allowed', () => {
    const tree = mount(
      <table>
        <thead>
          <tr>
            <TableHeaderCell
              column={{}}
              allowSorting
            />
          </tr>
        </thead>
      </table>,
    );

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'pointer',
      });
  });

  test('should have correct styles when sorting is allowed', () => {
    const tree = mount(
      <DragDropContext>
        <table>
          <thead>
            <tr>
              <TableHeaderCell
                column={{}}
                allowDragging
              />
            </tr>
          </thead>
        </table>
      </DragDropContext>,
    );

    expect(tree.find('th').prop('style'))
      .toMatchObject({
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        cursor: 'move',
      });
  });
});
