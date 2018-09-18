import { withComponents } from '@devexpress/dx-react-core';
import { TableEditColumn as TableEditColumnBase } from '@devexpress/dx-react-grid';
import {
  EditCommandHeadingCell as HeaderCell,
  EditCommandCell as Cell,
  CommandButton as Command,
} from '../templates/table-edit-command-cell';
import { withPatchedProps } from '../utils/with-patched-props';

const TableEditColumnWithWidth = withPatchedProps(props => ({
  width: 150,
  ...props,
}))(TableEditColumnBase);

TableEditColumnWithWidth.components = TableEditColumnBase.components;

export const TableEditColumn = withComponents({
  Cell, HeaderCell, Command,
})(TableEditColumnWithWidth);

TableEditColumn.COLUMN_TYPE = TableEditColumnBase.COLUMN_TYPE;
