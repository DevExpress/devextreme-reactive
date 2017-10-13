import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  TABLE_DATA_TYPE,
  orderedColumns,
  getTableTargetColumnIndex,
  changeColumnOrder,
} from '@devexpress/dx-grid-core';
import {
  PluginHost,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  DragDropContext,
  DropTarget,
} from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from './test-utils';
import { TableColumnReordering } from './table-column-reordering';

jest.mock('@devexpress/dx-grid-core', () => ({
  TABLE_DATA_TYPE: 'd',
  orderedColumns: jest.fn(),
  getTableTargetColumnIndex: jest.fn(),
  changeColumnOrder: jest.fn(),
}));

const reorderingRowTemplate = jest.fn();
const reorderingCellTemplate = jest.fn();

const defaultDeps = {
  getter: {
    tableColumns: [
      { key: `${TABLE_DATA_TYPE}_a'`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { key: `${TABLE_DATA_TYPE}_b'`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
    ],
    tableHeaderRows: [],
  },
  template: {
    tableView: {},
  },
  plugins: ['TableView'],
};

describe('TableColumnReordering', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    reorderingRowTemplate.mockImplementation(() => <div />);
    reorderingCellTemplate.mockImplementation(({ getCellDimension }) =>
      <div ref={node => getCellDimension(() => node.getBoundingClientRect())} />);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should apply the column order specified in the "defaultOrder" property in uncontrolled mode', () => {
    mount(
      <DragDropContext>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            defaultOrder={['b', 'a']}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>,
    );

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should apply the column order specified in the "order" property in controlled mode', () => {
    mount(
      <DragDropContext>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            order={['b', 'a']}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>,
    );

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should render DropTarget', () => {
    const tree = mount(
      <DragDropContext>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            order={['b', 'a']}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>,
    );

    expect(tree.find(DropTarget).exists())
      .toBeTruthy();
  });

  describe('drag\'n\'drop reordering', () => {
    const mountWithCellTemplates = ({ defaultOrder }, deps = {}) => mount(
      <DragDropContext>
        <PluginHost>
          <Template name="tableView">
            <div>
              <TemplateConnector>
                {({ tableColumns }) => (
                  <div>
                    {tableColumns.map(tableColumn => tableColumn.type === TABLE_DATA_TYPE && (
                      <TemplatePlaceholder
                        key={tableColumn.column.name}
                        name="tableViewCell"
                        params={{
                          tableColumn,
                          tableRow: { key: 'reordering', type: 'reordering' },
                        }}
                      />
                    ))}
                  </div>
                )}
              </TemplateConnector>
            </div>
          </Template>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableColumnReordering
            defaultOrder={defaultOrder}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>,
    );

    beforeEach(() => {
      orderedColumns.mockImplementation(() => defaultDeps.getter.tableColumns);
    });

    it('should preview column order while dragging', () => {
      getTableTargetColumnIndex
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 0);

      const targetWrapper = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(DropTarget);

      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });
      expect(orderedColumns)
        .toHaveBeenLastCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);

      getTableTargetColumnIndex.mockImplementationOnce(() => 0);
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 20 } });
      expect(orderedColumns)
        .toHaveBeenLastCalledWith(defaultDeps.getter.tableColumns, ['a', 'b']);
    });

    it('should revert column order when source moves out', () => {
      getTableTargetColumnIndex.mockImplementation(() => 1);

      const targetWrapper = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(DropTarget);

      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });
      targetWrapper.prop('onLeave')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: -10 } });

      expect(orderedColumns)
        .toHaveBeenLastCalledWith(defaultDeps.getter.tableColumns, ['a', 'b']);
    });

    it('should change column order on drop', () => {
      getTableTargetColumnIndex.mockImplementation(() => 1);

      const targetWrapper = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(DropTarget);

      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });
      targetWrapper.prop('onDrop')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });

      expect(changeColumnOrder)
        .toBeCalledWith(['a', 'b'], { sourceColumnName: 'a', targetColumnName: 'b' });
    });

    it('should not fail while dragging a column when non-data type columns are present', () => {
      const deps = {
        getter: {
          tableColumns: [
            ...defaultDeps.getter.tableColumns,
            { key: 'test_c', type: 'test', column: { name: 'c' } },
          ],
        },
      };

      orderedColumns.mockImplementation(() => deps.getter.tableColumns);
      getTableTargetColumnIndex.mockImplementation(() => 1);

      const targetWrapper = mountWithCellTemplates({ defaultOrder: ['a', 'b', 'c'] }, deps)
        .find(DropTarget);

      expect(() => {
        targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });
      }).not.toThrow();
    });

    it('should preview column order correctly when non-data columns are present', () => {
      const deps = {
        getter: {
          tableColumns: [
            { key: 'test_c', type: 'test', column: { name: 'c' } },
            ...defaultDeps.getter.tableColumns,
          ],
        },
      };

      orderedColumns.mockImplementation(() => deps.getter.tableColumns);
      getTableTargetColumnIndex.mockImplementation(() => 1);

      const targetWrapper = mountWithCellTemplates({ defaultOrder: ['c', 'a', 'b'] }, deps)
        .find(DropTarget);
      targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'a' }], clientOffset: { x: 180 } });

      expect(orderedColumns)
        .toHaveBeenLastCalledWith(deps.getter.tableColumns, ['c', 'b', 'a']);
    });

    // fit('should not fail after a column had disappeared', () => {
    //   const deps = {
    //     getter: {
    //       tableColumns: [
    //         ...defaultDeps.getter.tableColumns,
    //         // { key: 'test_c', type: 'test', column: { name: 'c' } },
    //         { key: `${TABLE_DATA_TYPE}_c'`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
    //         // { key: `${TABLE_DATA_TYPE}_d'`, type: TABLE_DATA_TYPE, column: { name: 'd' } },
    //       ],
    //     },
    //   };

    //   orderedColumns.mockImplementation(() => deps.getter.tableColumns);
    //   getTableTargetColumnIndex.mockImplementation(() => 1);

    //   const tree = mountWithCellTemplates({ defaultOrder: ['a', 'b', 'c'] }, deps);
    //   const targetWrapper = tree.find(DropTarget);

    //   orderedColumns.mockImplementation(() => [
    //     ...defaultDeps.getter.tableColumns,
    //     { key: 'test_c', type: 'test', column: { name: 'c' } },
    //   ]);
    //   tree.update();
    //   console.log(tree.debug())

    //   expect(() => {
    //     targetWrapper.prop('onOver')({ payload: [{ type: 'column', columnName: 'c' }], clientOffset: { x: 180 } });
    //   }).not.toThrow();
    // });
  });
});
