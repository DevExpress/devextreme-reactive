import { DxTableFilterRow as DxTableFilterRowBase } from '@devexpress/dx-vue-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';
import { Editor } from '../templates/filter-row/editor';
import { FilterSelector } from '../templates/filter-row/filter-selector';
import { Icon } from '../templates/filter-row/icon';

const defaultMessages = {
  filterPlaceholder: 'Filter...',
  contains: 'Contains',
  notContains: 'Does not contain',
  startsWith: 'Starts with',
  endsWith: 'Ends with',
  equal: 'Equals',
  notEqual: 'Does not equal',
  greaterThan: 'Greater than',
  greaterThanOrEqual: 'Greater than or equal to',
  lessThan: 'Less than',
  lessThanOrEqual: 'Less than or equal to',
};

export const DxTableFilterRow = {
  name: 'DxTableFilterRow',
  functional: true,
  props: {
    messages: {
      type: Object,
    },
  },
  render(h, context) {
    return (
      <DxTableFilterRowBase
        cellComponent={TableFilterCell}
        rowComponent={TableRow}
        filterSelectorComponent={FilterSelector}
        iconComponent={Icon}
        editorComponent={Editor}
        messages={{ ...defaultMessages, ...context.props.messages }}
        {...context.data}
      />
    );
  },
  components: {
    DxCell: TableFilterCell,
    DxRow: TableRow,
    DxEditor: Editor,
    DxFilterSelector: FilterSelector,
    DxIcon: Icon,
  },
};
