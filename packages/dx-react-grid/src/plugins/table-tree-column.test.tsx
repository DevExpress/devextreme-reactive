import * as React from 'react';
import { create } from 'react-test-renderer';
import { pluginDepsToComponents, setupConsole } from '@devexpress/dx-testing';
import { PluginHost, TemplatePlaceholderBase } from '@devexpress/dx-react-core';
import { isTreeTableCell } from '@devexpress/dx-grid-core';
import { TableTreeColumn } from './table-tree-column';
import { TemplatePlaceholderBase } from '@devexpress/dx-react-core/src/plugin-based/template-placeholder'
jest.mock('@devexpress/dx-grid-core', () => ({
  isTreeTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    expandedRowIds: [],
    getCellValue: row => row.value,
    getCollapsedRows: () => undefined,
    isTreeRowLeaf: () => true,
    getTreeRowLevel: () => 1,
  },
  action: {
    toggleRowExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: { value: 'value' } },
      tableColumn: { type: 'undefined', rowId: 1, column: { name: 'a' } },
      style: {},
    },
  },
  plugins: ['TreeDataState', 'Table'],
};

const defaultProps = {
  for: 'a',
  cellComponent: ({ children }) => children,
  indentComponent: () => null,
  expandButtonComponent: () => null,
  checkboxComponent: () => null,
  contentComponent: () => null,
};

describe('TableTreeColumn', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    isTreeTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('cellComponent', () => {
    it('should render tree cell on data column and data row intersection', () => {
      isTreeTableCell.mockImplementation(() => true);

      const tree = create((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableTreeColumn
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(isTreeTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
          defaultProps.for,
        );
      expect(tree.root.findByType(defaultProps.cellComponent).props)
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
          column: defaultDeps.template.tableCell.tableColumn.column,
          value: defaultDeps.template.tableCell.tableRow.row.value,
        });
    });

    it('should provide correct params for indent', () => {
      isTreeTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          getTreeRowLevel: jest.fn(() => 2),
        },
        template: {
          tableCell: {
            tableRow: { row: { value: '1' }, rowId: 'rowId' },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };

      const tree = create((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableTreeColumn
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(tree.root.findByType(defaultProps.indentComponent).props)
        .toMatchObject({
          level: 2,
        });
      expect(deps.getter.getTreeRowLevel)
        .toBeCalledWith(deps.template.tableCell.tableRow.row);
    });

    it('should provide correct params for toggle button', () => {
      isTreeTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          expandedRowIds: [],
          isTreeRowLeaf: jest.fn(() => false),
        },
        template: {
          tableCell: {
            tableRow: { row: { value: '1' }, level: 1, rowId: 'rowId' },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };
      jest.spyOn(deps.getter.expandedRowIds, 'indexOf').mockReturnValue(1);

      const tree = create((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableTreeColumn
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(tree.root.findByType(defaultProps.expandButtonComponent).props)
        .toMatchObject({
          visible: true,
          expanded: true,
          onToggle: expect.any(Function),
        });
      expect(deps.getter.expandedRowIds.indexOf)
        .toBeCalledWith('rowId');
      expect(deps.getter.isTreeRowLeaf)
        .toBeCalledWith(deps.template.tableCell.tableRow.row);

      tree.root.findByType(defaultProps.expandButtonComponent).props.onToggle();
      expect(defaultDeps.action.toggleRowExpanded.mock.calls[0][0])
        .toEqual({ rowId: 'rowId' });
    });

    it('should provide correct params for checkbox', () => {
      isTreeTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          selection: [],
          isTreeRowLeaf: jest.fn(() => false),
        },
        action: {
          toggleSelection: jest.fn(),
        },
        template: {
          tableCell: {
            tableRow: { row: { value: '1' }, level: 1, rowId: 'rowId' },
            tableColumn: { column: { name: 'a' } },
          },
        },
        plugins: ['SelectionState'],
      };
      jest.spyOn(deps.getter.selection, 'indexOf').mockReturnValue(1);

      const tree = create((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableTreeColumn
            {...defaultProps}
            showSelectionControls
          />
        </PluginHost>
      ));
      expect(tree.root.findByType(defaultProps.checkboxComponent).props)
        .toMatchObject({
          disabled: false,
          checked: true,
          onChange: expect.any(Function),
        });
      expect(deps.getter.selection.indexOf)
        .toBeCalledWith('rowId');

      tree.root.findByType(defaultProps.checkboxComponent).props.onChange();
      expect(deps.action.toggleSelection.mock.calls[0][0])
        .toEqual({ rowIds: ['rowId'] });
    });
  });

  it('can render custom formatted data in cell', () => {
    isTreeTableCell.mockImplementation(() => true);

    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableTreeColumn
          {...defaultProps}
        />
      </PluginHost>
    ));

    const valueFormatterTemplatePlaceholder = tree.root.findByType(TemplatePlaceholderBase)
      .findByProps({'name': 'valueFormatter'});

    expect(valueFormatterTemplatePlaceholder.props.params)
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        row: defaultDeps.template.tableCell.tableRow.row,
        value: defaultDeps.template.tableCell.tableRow.row.value,
      });
  });

  it('should change "for" propserty in runtime', () => {
    class Test extends React.Component {
      constructor(propss) {
        super(propss);
        this.state = {
          columnName: propss.columnName,
        };
      }

      render() {
        const { columnName } = this.state;
        isTreeTableCell.mockImplementation((_, tableColumn) => (
          tableColumn.column.name === columnName
        ));

        return(
          <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
            <TableTreeColumn
              {...defaultProps}
              for={columnName}
            />
          </PluginHost>
        );
      }
    }

    const tree = create((
      <Test
        columnName={'b'}
      />
    ));

    expect(tree.root.findByType(defaultProps.cellComponent)).toBeNull();

    tree.update(<Test
      columnName={'a'}
    />)

    expect(tree.root.findByType(defaultProps.cellComponent)).not.toBeNull();
    expect(tree.root.findByType(defaultProps.cellComponent).props.column.name)
      .toEqual('a');
  });
});
