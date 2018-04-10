import { SortingControl } from './table-header-cell/sorting-control';

export const TableHeaderCell = {
  props: {
    row: {},
    tableRow: {},
    column: {},
    tableColumn: {},
    showSortingControls: {},
    sortingDirection: {},
  },
  render() {
    const isCellInteractive = this.showSortingControls;
    return (
      <th
        class={{
          'dx-g-bs4-cursor-pointer dx-g-bs4-user-select-none': isCellInteractive,
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
      </th>
    );
  },
};
