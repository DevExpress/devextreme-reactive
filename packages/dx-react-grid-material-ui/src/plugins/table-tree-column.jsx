import { withComponents } from '@devexpress/dx-react-core';
import { TableTreeColumn as TableTreeColumnBase } from '@devexpress/dx-react-grid';
import { TableTreeExpandButton as ExpandButton } from '../templates/table-tree-expand-button';
import { TableTreeCheckbox as Checkbox } from '../templates/table-tree-checkbox';
import { TableTreeIndent as Indent } from '../templates/table-tree-indent';
import { TableTreeContent as Content } from '../templates/table-tree-content';
import { TableTreeCell as Cell } from '../templates/table-tree-cell';

export const TableTreeColumn = withComponents({
  Cell, Content, Indent, ExpandButton, Checkbox,
})(TableTreeColumnBase);
