import { SortingControl } from './table-header-cell/sorting-control';
import { GroupingControl } from './table-header-cell/grouping-control';

export const TableHeaderCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
    sortingDirection: {},
    showSortingControls: {
      type: Boolean,
    },
    showGroupingControls: {
      type: Boolean,
    },
    sortingEnabled: {
      type: Boolean,
    },
    groupingEnabled: {
      type: Boolean,
    },
    getMessage: {},
  },
  render() {
    const {
      tableColumn,
      column,
      showSortingControls,
      showGroupingControls,
      sortingEnabled,
      groupingEnabled,
      sortingDirection,
    } = this;
    const isCellInteractive = showSortingControls && sortingEnabled;
    const align = (tableColumn && tableColumn.align) || 'left';
    const columnTitle = column && (column.title || column.name);
    return (
      <th
        class={{
          'position-relative dx-g-bs4-header-cell': true,
          'dx-g-bs4-cursor-pointer dx-g-bs4-user-select-none': isCellInteractive,
        }}
      >
        <div
          class="d-flex flex-direction-row align-items-center"
        >
          <div
            class={{
              'dx-g-bs4-table-header-cell-wrapper': true,
              'text-nowrap': !(tableColumn && tableColumn.wordWrapEnabled),
              [`text-${align}`]: align !== 'left',
            }}
          >
            {showSortingControls ? (
              <SortingControl
                align={align}
                disabled={!sortingEnabled}
                sortingDirection={sortingDirection}
                onChange={this.$emit.bind(this, 'sort')}
              >
                {columnTitle}
              </SortingControl>
            ) : (
              columnTitle
            )}
          </div>
          {showGroupingControls && (
            <div>
              <GroupingControl
                align={align}
                disabled={!groupingEnabled}
                onGroup={this.$emit.bind(this, 'group')}
              />
            </div>
          )}
        </div>
      </th>
    );
  },
};
