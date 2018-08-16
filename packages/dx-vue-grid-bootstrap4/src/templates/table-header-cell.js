import { SortingControl } from './table-header-cell/sorting-control';
import { GroupingControl } from './table-header-cell/grouping-control';

export const TableHeaderCell = {
  props: {
    tableRow: {
      type: Object,
    },
    column: {
      type: Object,
    },
    tableColumn: {
      type: Object,
    },
    sortingDirection: {
      type: String,
    },
    showSortingControls: {
      type: Boolean,
      default: false,
    },
    showGroupingControls: {
      type: Boolean,
      default: false,
    },
    sortingEnabled: {
      type: Boolean,
      default: false,
    },
    groupingEnabled: {
      type: Boolean,
      default: false,
    },
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
          'dx-g-bs4-user-select-none': isCellInteractive,
        }}
        scope="col"
      >
        <div
          class="d-flex flex-direction-row align-items-center"
        >
          {this.$slots.before}
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
                direction={sortingDirection}
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
