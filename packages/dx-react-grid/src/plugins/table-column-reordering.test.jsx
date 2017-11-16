import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import {
  TABLE_DATA_TYPE,
  TABLE_REORDERING_TYPE,
  orderedColumns,
  getTableTargetColumnIndex,
  changeColumnOrder,
  draftOrder,
} from '@devexpress/dx-grid-core';
import {
  PluginHost,
  Template,
  TemplatePlaceholder,
  TemplateConnector,
  DragDropContext,
} from '@devexpress/dx-react-core';
import { pluginDepsToComponents } from './test-utils';
import { TableColumnReordering } from './table-column-reordering';

jest.mock('@devexpress/dx-grid-core', () => ({
  TABLE_DATA_TYPE: 'd',
  TABLE_REORDERING_TYPE: 'r',
  orderedColumns: jest.fn(),
  getTableTargetColumnIndex: jest.fn(),
  changeColumnOrder: jest.fn(),
  tableHeaderRowsWithReordering: jest.fn(),
  draftOrder: jest.fn(),
}));

const reorderingRowTemplate = jest.fn();
const reorderingCellTemplate = jest.fn();
const tableContainerTemplate = jest.fn();

const defaultDeps = {
  getter: {
    tableColumns: [
      { key: `${TABLE_DATA_TYPE}_a`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { key: `${TABLE_DATA_TYPE}_b`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
    ],
    tableHeaderRows: [],
  },
  template: {
    table: {},
  },
  plugins: ['Table'],
};
const defaultClientOffset = { clientOffset: { x: 180 } };

describe('TableColumnReordering', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableContainerTemplate.mockImplementation(({ children }) => <div>{children}</div>);
    reorderingRowTemplate.mockImplementation(() => <div />);
    reorderingCellTemplate.mockImplementation(({ getCellDimensions }) =>
      <div ref={node => getCellDimensions(() => node.getBoundingClientRect())} />);
    draftOrder.mockImplementation(args => args);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should apply the column order specified in the "defaultOrder" property in uncontrolled mode', () => {
    mount((
      <DragDropContext>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            defaultOrder={['b', 'a']}
            tableContainerTemplate={tableContainerTemplate}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>
    ));

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should apply the column order specified in the "order" property in controlled mode', () => {
    mount((
      <DragDropContext>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            order={['b', 'a']}
            tableContainerTemplate={tableContainerTemplate}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>
    ));

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should render the "table" template', () => {
    mount((
      <DragDropContext>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            order={['b', 'a']}
            tableContainerTemplate={tableContainerTemplate}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>
    ));

    expect(tableContainerTemplate)
      .toHaveBeenCalledTimes(1);
    expect(tableContainerTemplate)
      .toHaveBeenCalledWith({
        onOver: expect.any(Function),
        onLeave: expect.any(Function),
        onDrop: expect.any(Function),
        children: expect.any(Object),
      });
  });

  describe('drag\'n\'drop reordering', () => {
    // eslint-disable-next-line react/prop-types
    const TableMock = ({ children }) => <div>{children}</div>;
    const mountWithCellTemplates = ({ defaultOrder }, deps = {}) => mount((
      <DragDropContext>
        <PluginHost>
          <Template name="table">
            <div>
              <TemplateConnector>
                {({ tableColumns }) => (
                  <div>
                    {tableColumns.map(tableColumn => tableColumn.type === TABLE_DATA_TYPE && (
                      <TemplatePlaceholder
                        key={tableColumn.column.name}
                        name="tableCell"
                        params={{
                          tableColumn,
                          tableRow: { key: TABLE_REORDERING_TYPE, type: TABLE_REORDERING_TYPE },
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
            tableContainerTemplate={props => <TableMock {...props} />}
            reorderingRowTemplate={reorderingRowTemplate}
            reorderingCellTemplate={reorderingCellTemplate}
          />
        </PluginHost>
      </DragDropContext>
    ));

    beforeEach(() => {
      orderedColumns.mockImplementation(() => defaultDeps.getter.tableColumns);
    });

    it('should preview column order while dragging', () => {
      getTableTargetColumnIndex
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 1)
        .mockImplementationOnce(() => 0);

      const onOver = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(TableMock)
        .prop('onOver');

      orderedColumns.mockClear();

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
      expect(draftOrder)
        .toHaveBeenLastCalledWith(['a', 'b'], 0, 1);

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
      expect(draftOrder)
        .toHaveBeenLastCalledWith(['a', 'b'], 0, 1);
      expect(orderedColumns)
        .toHaveBeenCalledTimes(1);

      getTableTargetColumnIndex.mockImplementationOnce(() => 0);
      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
      expect(draftOrder)
        .toHaveBeenLastCalledWith(['a', 'b'], 0, 0);
    });

    it('should revert column order when source moves out', () => {
      getTableTargetColumnIndex.mockImplementation(() => 1);

      const { onOver, onLeave } = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(TableMock)
        .props();

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
      onLeave({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });

      expect(orderedColumns)
        .toHaveBeenLastCalledWith(defaultDeps.getter.tableColumns, ['a', 'b']);
    });

    it('should change column order on drop', () => {
      getTableTargetColumnIndex.mockImplementation(() => 1);

      const { onOver, onDrop } = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(TableMock)
        .props();

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
      onDrop({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });

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

      const onOver = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(TableMock)
        .prop('onOver');

      expect(() => {
        onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
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

      const onOver = mountWithCellTemplates({ defaultOrder: ['c', 'a', 'b'] }, deps)
        .find(TableMock)
        .prop('onOver');

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });
      expect(draftOrder)
        .toHaveBeenLastCalledWith(['c', 'a', 'b'], 1, 2);
    });
  });
});
