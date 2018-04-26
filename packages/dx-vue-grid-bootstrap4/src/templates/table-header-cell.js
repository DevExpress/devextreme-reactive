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
    const isCellInteractive = this.showSortingControls && this.sortingEnabled;
    const align = (this.tableColumn && this.tableColumn.align) || 'left';
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
              [`text-${align}`]: align !== 'left',
            }}
          >
            {this.showSortingControls ? (
              <SortingControl
                direction={this.sortingDirection}
                onChange={this.$emit.bind(this, 'sort')}
              >
                {this.tableColumn.column.title || this.tableColumn.column.name}
              </SortingControl>
            ) : (
              this.tableColumn.column.title || this.tableColumn.column.name
            )}
          </div>
          {this.showGroupingControls && (
            <div>
              <GroupingControl
                align={align}
                disabled={!this.groupingEnabled}
                onGroup={this.$emit.bind(this, 'group')}
              />
            </div>
          )}
        </div>
      </th>
    );
  },
};
