import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getColumnSortingDirection,
  getNextColumnName,
} from '@devexpress/dx-grid-core';
import { TableHeaderRow } from './table-header-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithHeading: jest.fn(),
  isHeadingTableCell: jest.fn(),
  isHeadingTableRow: jest.fn(),
  getColumnSortingDirection: jest.fn(),
  getNextColumnName: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }],
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    isColumnSortingEnabled: () => false,
    tableColumns: [],
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['Table'],
};

const defaultProps = {
  cellComponent: () => null,
  contentComponent: () => null,
  titleComponent: () => null,
  sortLabelComponent: () => null,
  rowComponent: () => null,
  groupButtonComponent: () => null,
};

describe('TableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithHeading.mockImplementation(() => 'tableRowsWithHeading');
    isHeadingTableCell.mockImplementation(() => false);
    isHeadingTableRow.mockImplementation(() => false);
    getColumnSortingDirection.mockImplementation(() => null);
    getNextColumnName.mockImplementation(() => undefined);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableRowsWithHeading');
      expect(tableRowsWithHeading)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows);
    });
  });

  it('should render heading cell on user-defined column and heading row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isHeadingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('should render row by using rowComponent', () => {
    isHeadingTableRow.mockImplementation(() => true);

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isHeadingTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).props())
      .toMatchObject(defaultDeps.template.tableRow);
  });

  describe('resizing', () => {
    it('should pass correct props to cellComponent', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          tableColumnResizingEnabled: true,
          columnResizingMode: 'widget',
        },
        plugins: ['TableColumnResizing'],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(defaultProps.cellComponent).props())
        .toMatchObject({
          resizingEnabled: true,
          onWidthChange: expect.any(Function),
          onWidthDraft: expect.any(Function),
        });
    });

    it('should call correct action when on onWidthChange', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        getter: {
          tableColumnResizingEnabled: true,
        },
        action: {
          changeTableColumnWidth: jest.fn(),
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const { onWidthChange } = tree.find(defaultProps.cellComponent).props();
      onWidthChange({ shift: 10 });
      expect(deps.action.changeTableColumnWidth.mock.calls[0][0])
        .toEqual({ columnName: 'a', shift: 10 });
    });

    it('should call correct action when on onWidthDraft', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          draftTableColumnWidth: jest.fn(),
        },
        getter: {
          tableColumnResizingEnabled: true,
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const { onWidthDraft } = tree.find(defaultProps.cellComponent).props();
      onWidthDraft({ shift: 10 });
      expect(deps.action.draftTableColumnWidth.mock.calls[0][0])
        .toEqual({ columnName: 'a', shift: 10 });
    });

    it('should call correct action when on onWidthDraftCancel', () => {
      isHeadingTableCell.mockImplementation(() => true);

      const deps = {
        plugins: ['TableColumnResizing'],
        action: {
          cancelTableColumnWidthDraft: jest.fn(),
        },
        getter: {
          tableColumnResizingEnabled: true,
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
          />
        </PluginHost>
      ));

      const { onWidthDraftCancel } = tree.find(defaultProps.cellComponent).props();
      onWidthDraftCancel();
      expect(deps.action.cancelTableColumnWidthDraft.mock.calls[0][0])
        .toEqual();
    });
  });

  describe('Header cell', () => {
    it('should use column name if title is not specified', () => {
      isHeadingTableCell.mockImplementation(() => true);
      const deps = {
        template: {
          tableCell: {
            tableColumn: { type: 'undefined', column: { name: 'Test' } },
          },
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            cellComponent={({ children }) => (
              <th>
                {children}
              </th>
            )}
            contentComponent={({ children }) => (
              <div>
                {children}
              </div>
            )}
            titleComponent={({ children }) => (
              <span>
                {children}
              </span>
            )}
          />
        </PluginHost>
      ));

      expect(tree.find('th span').text()).toBe('Test');
    });

    it('should not render sort label by default', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableHeaderRow
            {...defaultProps}
            sortLabelComponent={() => <div className="sort-label" />}
            cellComponent={({ children }) => (
              <th>
                {children}
              </th>
            )}
            contentComponent={({ children }) => (
              <div>
                {children}
              </div>
            )}
          />
        </PluginHost>
      ));

      expect(tree.find('.sort-label').exists())
        .not.toBeTruthy();
    });

    it('should render sort label if showSortingControls is true', () => {
      isHeadingTableCell.mockImplementation(() => true);
      const deps = {
        plugins: ['SortingState'],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            showSortingControls
            sortLabelComponent={({ getMessage }) => (
              <div className="sort-label" title={getMessage('sortingHint')} />
            )}
            cellComponent={({ children }) => (
              <th>
                {children}
              </th>
            )}
            contentComponent={({ children }) => (
              <div>
                {children}
              </div>
            )}
            messages={{
              sortingHint: 'test',
            }}
          />
        </PluginHost>
      ));
      const sortLabel = tree.find('.sort-label');

      expect(sortLabel.exists())
        .toBeTruthy();
      expect(sortLabel.props().title)
        .toBe('test');
    });

    it('should render group button if showGroupingControls is true', () => {
      isHeadingTableCell.mockImplementation(() => true);
      const deps = {
        plugins: ['GroupingState'],
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <TableHeaderRow
            {...defaultProps}
            showGroupingControls
            groupButtonComponent={() => (
              <div className="group-button" />
            )}
            cellComponent={({ children }) => (
              <th>
                {children}
              </th>
            )}
            messages={{
              sortingHint: 'test',
            }}
          />
        </PluginHost>
      ));
      const sortLabel = tree.find('.group-button');

      expect(sortLabel.exists())
        .toBeTruthy();
    });
  });

  it('should pass "isFixed" property to cellComponent', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const Wrapper = ({ isFixed }) => (
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableHeaderRow
          {...defaultProps}
          isFixed={isFixed}
        />
      </PluginHost>
    );
    const tree = mount(<Wrapper isFixed/>);

    expect(tree.find(defaultProps.cellComponent).props().isFixed)
      .toBe(true);

    tree.setProps({ isFixed: false });
    tree.update();

    expect(tree.find(defaultProps.cellComponent).props().isFixed)
      .toBe(false);
  });
});
