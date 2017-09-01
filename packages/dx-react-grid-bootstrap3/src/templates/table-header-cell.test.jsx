import React from 'react';
import { mount } from 'enzyme';

import { DragDropContext, DragSource, Draggable } from '@devexpress/dx-react-core';
import { setupConsole } from '@devexpress/dx-testing';

import { TableHeaderCell } from './table-header-cell';

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

  describe('resizing', () => {
    it('should trigger changeColumnWidth with correct change on resize end', () => {
      const changeColumnWidth = jest.fn();
      const tree = mount(
        <TableHeaderCell
          column={{}}
          allowResizing
          changeDraftColumnWidth={() => {}}
          changeColumnWidth={changeColumnWidth}
        />,
      );

      tree.find(Draggable).prop('onStart')({ x: 0 });

      tree.find(Draggable).prop('onEnd')({ x: 10 });
      expect(changeColumnWidth)
        .toBeCalledWith({ shift: 10 });
    });

    it('should trigger changeDraftColumnWidth with correct change on resize update', () => {
      const changeDraftColumnWidth = jest.fn();
      const tree = mount(
        <TableHeaderCell
          column={{}}
          allowResizing
          changeDraftColumnWidth={changeDraftColumnWidth}
          changeColumnWidth={() => {}}
        />,
      );

      tree.find(Draggable).prop('onStart')({ x: 0 });

      tree.find(Draggable).prop('onUpdate')({ x: 10 });
      expect(changeDraftColumnWidth)
        .toBeCalledWith({ shift: 10 });
    });
  });
});
