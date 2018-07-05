import { DxTableTreeColumn as DxTableTreeColumnBase } from '@devexpress/dx-vue-grid';
import { TableTreeExpandButton } from '../templates/table-tree-expand-button';
import { TableTreeCheckbox } from '../templates/table-tree-checkbox';
import { TableTreeIndent } from '../templates/table-tree-indent';
import { TableTreeCell } from '../templates/table-tree-cell';
import { TableTreeContent } from '../templates/table-tree-content';

export const DxTableTreeColumn = {
  render() {
    return (
      <DxTableTreeColumnBase
        cellComponent={TableTreeCell}
        contentComponent={TableTreeContent}
        indentComponent={TableTreeIndent}
        expandButtonComponent={TableTreeExpandButton}
        checkboxComponent={TableTreeCheckbox}
        {...{ attrs: this.$attrs, on: this.$listeners }}
      />
    );
  },
};
