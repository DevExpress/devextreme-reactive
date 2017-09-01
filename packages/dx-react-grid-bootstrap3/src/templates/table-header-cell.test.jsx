import React from 'react';
import { mount } from 'enzyme';
import { DragDropContext, DragSource } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableHeaderCell } from './table-header-cell';
import { ResizingControl } from './table-header-cell/resizing-control';

describe('TableHeaderCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should use column name if title is not specified', () => {
    const tree = mount(
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('th > div').text()).toBe('Test');
  });

  it('should have correct styles when user interaction disallowed', () => {
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

  it('should have correct styles when sorting is allowed', () => {
    const tree = mount(
      <table>
        <thead>
          <tr>
            <TableHeaderCell
              column={{ name: 'a' }}
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

  it('should have correct styles when dragging is allowed', () => {
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
        cursor: 'pointer',
      });
  });

  it('should have correct styles when dragging', () => {
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
      .not.toMatchObject({
        opacity: 0.3,
      });

    tree.find(DragSource).prop('onStart')();
    expect(tree.find('th').prop('style'))
      .toMatchObject({
        opacity: 0.3,
      });

    tree.find(DragSource).prop('onEnd')();
    expect(tree.find('th').prop('style'))
      .not.toMatchObject({
        opacity: 0.3,
      });
  });

  it('should render resize control if resize allowed', () => {
    const changeColumnWidth = () => {};
    const changeDraftColumnWidth = () => {};
    const tree = mount(
      <TableHeaderCell
        column={{}}
        allowResizing
        changeDraftColumnWidth={changeDraftColumnWidth}
        changeColumnWidth={changeColumnWidth}
      />,
    );

    expect(tree.find(ResizingControl).exists())
      .toBeTruthy();
    expect(tree.find(ResizingControl).prop('changeDraftColumnWidth'))
      .toBe(changeDraftColumnWidth);
    expect(tree.find(ResizingControl).prop('changeColumnWidth'))
      .toBe(changeColumnWidth);
  });
});
