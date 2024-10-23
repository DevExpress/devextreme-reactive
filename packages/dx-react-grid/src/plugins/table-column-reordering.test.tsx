import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, setupConsole } from '@devexpress/dx-testing';
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
  DragDropProvider,
} from '@devexpress/dx-react-core';
import { TableColumnReordering } from './table-column-reordering';

jest.mock('@devexpress/dx-grid-core', () => ({
  TABLE_DATA_TYPE: 'd',
  TABLE_REORDERING_TYPE: 'r',
  orderedColumns: jest.fn(),
  getTableTargetColumnIndex: jest.fn(),
  changeColumnOrder: jest.fn(args => args),
  tableHeaderRowsWithReordering: jest.fn(),
  draftOrder: jest.fn(args => args),
}));

/* eslint-disable react/prop-types */
const getBoundingClientRect = jest.fn(node => node.getBoundingClientRect());
const defaultProps = {
  tableContainerComponent: ({ children }) => (
    <div>
      {children}
    </div>
  ),
  rowComponent: () => null,
  cellComponent: (
    { getCellDimensions },
  ) => <div ref={node => getCellDimensions(() => getBoundingClientRect(node))} />,
};
/* eslint-enable react/prop-types */

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  // tslint:disable-next-line: max-line-length
  it('should apply the column order specified in the "defaultOrder" property in uncontrolled mode', () => {
    mount((
      <DragDropProvider>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            {...defaultProps}
            defaultOrder={['b', 'a']}
          />
        </PluginHost>
      </DragDropProvider>
    ));

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should apply the column order specified in the "order" property in controlled mode', () => {
    mount((
      <DragDropProvider>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            {...defaultProps}
            order={['b', 'a']}
          />
        </PluginHost>
      </DragDropProvider>
    ));

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should apply the column order in uncontrolled mode when drag-and-drop is disabled', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnReordering
          {...defaultProps}
          defaultOrder={['b', 'a']}
        />
      </PluginHost>
    ));

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should apply the column order in controlled mode when drag-and-drop is disabled', () => {
    mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableColumnReordering
          {...defaultProps}
          order={['b', 'a']}
        />
      </PluginHost>
    ));

    expect(orderedColumns)
      .toHaveBeenCalledTimes(1);
    expect(orderedColumns)
      .toHaveBeenCalledWith(defaultDeps.getter.tableColumns, ['b', 'a']);
  });

  it('should render the "table" template', () => {
    const tree = mount((
      <DragDropProvider>
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableColumnReordering
            {...defaultProps}
            order={['b', 'a']}
          />
        </PluginHost>
      </DragDropProvider>
    ));

    expect(tree.find(defaultProps.tableContainerComponent).props())
      .toEqual({
        onOver: expect.any(Function),
        onLeave: expect.any(Function),
        onDrop: expect.any(Function),
        children: expect.any(Object),
      });
  });

  describe('drag\'n\'drop reordering', () => {
    // eslint-disable-next-line react/prop-types
    const TableMock = ({ children }) => (
      <div>
        {children}
      </div>
    );

    const TestComponent = ({
      defaultOrder,
      onOrderChange,
      deps,
    }) => (
      <DragDropProvider>
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
            {...defaultProps}
            onOrderChange={onOrderChange}
            defaultOrder={defaultOrder}
            tableContainerComponent={props => <TableMock {...props} />}
          />
        </PluginHost>
      </DragDropProvider>
    );

    const mountWithCellTemplates = ({
      defaultOrder, onOrderChange,
    }, deps = {}) => mount((
      <TestComponent
        defaultOrder={defaultOrder}
        onOrderChange={onOrderChange}
        deps={deps}
      />
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

    it('should clear cell dimension cache when the number of columns changes', () => {
      const deps = {
        getter: {
          tableColumns: [
            ...defaultDeps.getter.tableColumns,
          ],
        },
      };
      let cellDimensions;

      orderedColumns.mockImplementation(() => deps.getter.tableColumns);
      getTableTargetColumnIndex.mockImplementation((cellDimensionsArg) => {
        cellDimensions = cellDimensionsArg;
        return 1;
      });

      const wrapper = mount(
        <TestComponent
          defaultOrder={['a', 'b']}
          onOrderChange={() => undefined}
          deps={deps}
        />
      );

      const onOver = wrapper.find(TableMock).prop('onOver');

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });

      expect(cellDimensions.length).toEqual(2);

      const newDeps = {
        getter: {
          tableColumns: [
            ...[defaultDeps.getter.tableColumns[0]],
          ],
        },
      };
      cellDimensions = [];

      orderedColumns.mockImplementation(() => newDeps.getter.tableColumns);
      wrapper.setProps({ deps: newDeps });

      onOver({ payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset });

      expect(cellDimensions.length).toEqual(1);
    });

    it('should reset cell dimensions after leave and drop events', () => {
      const onOverArg = { payload: [{ type: 'column', columnName: 'a' }], ...defaultClientOffset };
      const { onOver, onLeave, onDrop } = mountWithCellTemplates({ defaultOrder: ['a', 'b'] })
        .find(TableMock)
        .props();

      getBoundingClientRect.mockClear();

      onOver(onOverArg);
      onOver(onOverArg);
      onOver(onOverArg);

      onLeave();
      onOver(onOverArg);
      onOver(onOverArg);
      onOver(onOverArg);

      onDrop();
      onOver(onOverArg);
      onOver(onOverArg);
      onOver(onOverArg);

      expect(getBoundingClientRect)
        .toHaveBeenCalledTimes(defaultDeps.getter.tableColumns.length * 3);
    });

    it('should work correctly if table columns are changed', () => {
      const changedTableColumns = [
        { key: `${TABLE_DATA_TYPE}_a`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
        { key: `${TABLE_DATA_TYPE}_c`, type: TABLE_DATA_TYPE, column: { name: 'c' } },
      ];
      const tree = mount((
        <DragDropProvider>
          <PluginHost>
            <Template name="table">
              {changedTableColumns.map(tableColumn => tableColumn.type === TABLE_DATA_TYPE && (
                <TemplatePlaceholder
                  key={tableColumn.column.name}
                  name="tableCell"
                  params={{
                    tableColumn,
                    tableRow: { key: TABLE_REORDERING_TYPE, type: TABLE_REORDERING_TYPE },
                  }}
                />
              ))}
            </Template>
            {pluginDepsToComponents(defaultDeps)}
            <TableColumnReordering
              {...defaultProps}
              defaultOrder={['a', 'b']}
              tableContainerComponent={props => <TableMock {...props} />}
            />
          </PluginHost>
        </DragDropProvider>
      ));
      const { cellDimensionGetters } = tree.find(TableColumnReordering).childAt(0).instance();
      expect(Object.keys(cellDimensionGetters)).toEqual(['a']);
    });

    it('should not change column order if target is moved from outside', () => {
      const onOrderChangeMock = jest.fn();
      const { onLeave, onDrop } = mountWithCellTemplates(
        { defaultOrder: ['a', 'b'], onOrderChange: onOrderChangeMock },
      )
        .find(TableMock)
        .props();

      onLeave();
      onDrop();

      expect(changeColumnOrder).not.toBeCalled();
      expect(onOrderChangeMock).not.toBeCalled();
    });
  });
});
